var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { sp } from "@pnp/sp/presets/all";
import { PromoItem } from "../model/Promo";
import { CategoryRepository } from "./CategoryRepository";
import { ClientProductRepository } from "./ClientProductRepository";
import { LastYearVolumesRepository } from "./LastYearVolumesRepository";
var PromoItemRepository = /** @class */ (function () {
    function PromoItemRepository() {
    }
    PromoItemRepository.GetByPromo = function (promoId, clientId) {
        return __awaiter(this, void 0, void 0, function () {
            var items, collection;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getByTitle(PromoItemRepository.LIST_NAME)
                            .items.select("ID", "Title", "ShortDescription", "CategoryId", "Investment", "Type/ID", "Type/Title", "CappedActivity", "BusinessUnit/ID", "BusinessUnit/Title", "Brand/ID", "Brand/Title", "ProductCategory/ID", "ProductCategory/Title", "StartDate", "EndDate", "DiscountPerPiece", "NetPrice", "COGS", "Redemption", "BaseVolume", "EstimatedIncrementalVolume", "AdditionalInvestment", "SKUProductId").expand("Type", "BusinessUnit", "Brand", "ProductCategory").filter("PromoId eq " + promoId).get()];
                    case 1:
                        items = _a.sent();
                        collection = items.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var category, _a, clientproduct, _b, volumesLY, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        if (!item.CategoryId) return [3 /*break*/, 2];
                                        return [4 /*yield*/, CategoryRepository.GetById(item.CategoryId)];
                                    case 1:
                                        _a = _d.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _a = null;
                                        _d.label = 3;
                                    case 3:
                                        category = _a;
                                        if (!item.SKUProductId) return [3 /*break*/, 5];
                                        return [4 /*yield*/, ClientProductRepository.GetById(item.SKUProductId)];
                                    case 4:
                                        _b = _d.sent();
                                        return [3 /*break*/, 6];
                                    case 5:
                                        _b = null;
                                        _d.label = 6;
                                    case 6:
                                        clientproduct = _b;
                                        if (!(clientId && item.ProductId)) return [3 /*break*/, 8];
                                        return [4 /*yield*/, LastYearVolumesRepository.GetByClientAndProduct(clientId, item.ProductId)];
                                    case 7:
                                        _c = _d.sent();
                                        return [3 /*break*/, 9];
                                    case 8:
                                        _c = null;
                                        _d.label = 9;
                                    case 9:
                                        volumesLY = _c;
                                        return [2 /*return*/, PromoItemRepository.BuildEntity(item, category, clientproduct, volumesLY)];
                                }
                            });
                        }); });
                        return [2 /*return*/, Promise.all(collection)];
                }
            });
        });
    };
    PromoItemRepository.SaveOrUpdateItems = function (promoItemId, promoID, items) {
        return __awaiter(this, void 0, void 0, function () {
            var list, entityTypeFullName, batch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        list = sp.web.lists.getByTitle(PromoItemRepository.LIST_NAME);
                        return [4 /*yield*/, list.getListItemEntityTypeFullName()];
                    case 1:
                        entityTypeFullName = _a.sent();
                        batch = sp.web.createBatch();
                        items.map(function (entity, index) {
                            var number = index + 1;
                            //console.log(entity.Product.ItemId);
                            var data = {
                                PromoId: promoItemId,
                                Title: promoID + "." + number,
                                ShortDescription: entity.ShortDescription,
                                CategoryId: entity.Category ? entity.Category.ItemId : null,
                                Investment: entity.Investment,
                                TypeId: entity.Type ? entity.Type.ItemId : null,
                                CappedActivity: entity.CappedActivity,
                                BusinessUnitId: entity.BusinessUnit ? entity.BusinessUnit.ItemId : null,
                                BrandId: entity.Brand ? entity.Brand.ItemId : null,
                                ProductCategoryId: entity.ProductCategory ? entity.ProductCategory.ItemId : null,
                                SKUProductId: entity.ClientProduct ? entity.ClientProduct.ItemId : null,
                                //Product: entity.GetSKUNumberString(),
                                StartDate: entity.StartDate,
                                EndDate: entity.EndDate,
                                DiscountPerPiece: entity.DiscountPerPiece,
                                NetPrice: entity.NetPrice,
                                COGS: entity.COGS,
                                DiscountPercentage: entity.GetDiscountPercentage(),
                                GMPercentageNR: entity.GetGMPercentageNR(),
                                GMPercentageNRWithPromo: entity.GetGMPercentageNRWithPromo(),
                                GMBaseUnit: entity.GetGMBaseUnit(),
                                GMPromoUnit: entity.GetGMPromoUnit(),
                                Redemption: entity.Redemption,
                                BaseVolume: entity.BaseVolume,
                                EstimatedROI: entity.GetROI(),
                                EstimatedIncrementalVolume: entity.EstimatedIncrementalVolume,
                                AdditionalInvestment: entity.AdditionalInvestment,
                                TotalEstimatedVolume: entity.GetTotalEstimatedVolume(),
                                EstimatedInvestment: entity.GetEstimatedInvestment(),
                            };
                            if (entity.ItemId)
                                list.items.getById(entity.ItemId).inBatch(batch).update(data, "*", entityTypeFullName);
                            else
                                list.items.inBatch(batch).add(data, entityTypeFullName);
                        });
                        return [4 /*yield*/, batch.execute()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PromoItemRepository.BuildEntity = function (item, category, clientproduct, lyVolumes) {
        var entity = new PromoItem();
        entity.ItemId = item.ID;
        entity.AdditionalID = item.Title;
        entity.ShortDescription = item.ShortDescription;
        entity.Category = category;
        entity.Investment = item.Investment;
        entity.Type = item.Type ? { ItemId: item.Type.ID, Name: item.Type.Title } : null;
        entity.CappedActivity = item.CappedActivity;
        entity.BusinessUnit = item.BusinessUnit ? { ItemId: item.BusinessUnit.ID, Value: item.BusinessUnit.Title } : null;
        entity.Brand = item.Brand ? { ItemId: item.Brand.ID, Value: item.Brand.Title } : null;
        entity.ProductCategory = item.ProductCategory ? { ItemId: item.ProductCategory.ID, Value: item.ProductCategory.Title } : null;
        entity.ClientProduct = clientproduct;
        //entity.Product = item.Product ? { ItemId: item.Product.ID, Value: item.Product.Title } : null,
        //entity.Product = product;
        entity.StartDate = item.StartDate ? new Date(item.StartDate) : null;
        entity.EndDate = item.EndDate ? new Date(item.EndDate) : null;
        entity.DiscountPerPiece = item.DiscountPerPiece;
        entity.NetPrice = item.NetPrice;
        entity.COGS = item.COGS;
        entity.Redemption = item.Redemption;
        entity.BaseVolume = item.BaseVolume;
        entity.EstimatedIncrementalVolume = item.EstimatedIncrementalVolume;
        entity.AdditionalInvestment = item.AdditionalInvestment;
        entity.LastYearVolumes = lyVolumes;
        //entity.Client = item.Client ? {ItemId: item.Client.ID, Value: item.Client.Title} : null;
        return entity;
    };
    PromoItemRepository.LIST_NAME = "Promo items";
    return PromoItemRepository;
}());
export { PromoItemRepository };
//# sourceMappingURL=PromoItemRepository.js.map