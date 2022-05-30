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
import { ClientProduct } from "../model/Common";
var ClientProductRepository = /** @class */ (function () {
    function ClientProductRepository() {
    }
    /*public static GetById(id: number): Promise<ClientProduct> {
        const entity = sp.web.lists.getByTitle(ClientProductRepository.LIST_NAME)
          .items.getById(id).select("ID", "Price", "COGS").get().then((item) => {
            return ClientProductRepository.BuildEntity(item);
          });
  
        return entity;
    }*/
    ClientProductRepository.GetById = function (id) {
        var entity = sp.web.lists.getByTitle(ClientProductRepository.LIST_NAME)
            .items.getById(id).select("ID", "Title", "SKUDescription", "Client/ID", "Client/Title", "Product/ID", "Product/Title", "Price", "COGS", "EAN", "BusinessUnit/ID", "BusinessUnit/Title", "Brand/ID", "Brand/Title", "ProductCategory/ID", "ProductCategory/Title").expand("Client", "Product", "BusinessUnit", "Brand", "ProductCategory").get().then(function (item) {
            return ClientProductRepository.BuildEntity(item);
        });
        return entity;
    };
    /*public static async GetByClientAndProduct(clientId: number, productId: number):Promise<ClientProduct>
    {   console.log(clientId, productId);
        const collection = sp.web.lists.getByTitle(ClientProductRepository.LIST_NAME)
            .items.select("ID", "Price", "COGS").filter(`ClientId eq ${clientId} and ProductId eq ${productId}`).get().then((items) => {
                if(items.length > 0)
                    return ClientProductRepository.BuildEntity(items[0]);
                else
                    return null;
            });

        return collection;
    }*/
    ClientProductRepository.GetByClientAndProduct = function (clientId, skuNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                collection = sp.web.lists.getByTitle(ClientProductRepository.LIST_NAME)
                    .items.select("ID", "Title", "Price", "COGS").filter("Title eq " + skuNumber + " and ClientId eq " + clientId).get().then(function (items) {
                    if (items.length > 0)
                        return ClientProductRepository.BuildEntity(items[0]);
                    else
                        return null;
                });
                return [2 /*return*/, collection];
            });
        });
    };
    ClientProductRepository.GetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                collection = sp.web.lists.getByTitle(ClientProductRepository.LIST_NAME)
                    .items.select("ID", "Title", "SKUDescription", "Client/ID", "Client/Title", "Product/ID", "Product/Title", "Price", "COGS", "EAN", "BusinessUnit/ID", "BusinessUnit/Title", "Brand/ID", "Brand/Title", "ProductCategory/ID", "ProductCategory/Title").expand("Client", "Product", "BusinessUnit", "Brand", "ProductCategory").getAll().then(function (items) {
                    var result = [];
                    items.map(function (item) {
                        if (item.Client && item.Client.ID && item.Client.Title &&
                            item.Product && item.Product.ID && item.Product.Title &&
                            item.BusinessUnit && item.BusinessUnit.ID && item.BusinessUnit.Title &&
                            item.Brand && item.Brand.ID && item.Brand.Title &&
                            item.ProductCategory && item.ProductCategory.ID && item.ProductCategory.Title)
                            result.push(ClientProductRepository.BuildEntity(item));
                    });
                    return result;
                });
                return [2 /*return*/, collection];
            });
        });
    };
    ClientProductRepository.BuildEntity = function (item) {
        var entity = new ClientProduct();
        entity.ItemId = item.ID;
        entity.SKUNumber = item.Title;
        entity.SKUDescription = item.SKUDescription;
        entity.Price = item.Price;
        entity.COGS = item.COGS;
        entity.BusinessUnit = item.BusinessUnit ? { ItemId: item.BusinessUnit.ID, Value: item.BusinessUnit.Title } : null;
        entity.Brand = item.Brand ? { ItemId: item.Brand.ID, Value: item.Brand.Title } : null;
        entity.Category = item.ProductCategory ? { ItemId: item.ProductCategory.ID, Value: item.ProductCategory.Title } : null;
        entity.Client = item.Client ? { ItemId: item.Client.ID, Value: item.Client.Title } : null;
        //entity.Product = item.Product ? { ItemId: item.Product.ID, Value: item.Product.Title } : null;
        return entity;
    };
    ClientProductRepository.LIST_NAME = "Productos por cliente";
    return ClientProductRepository;
}());
export { ClientProductRepository };
//# sourceMappingURL=ClientProductRepository.js.map