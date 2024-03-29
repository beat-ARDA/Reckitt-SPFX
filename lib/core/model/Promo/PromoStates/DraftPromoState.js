var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { PromoStatus } from "..";
import { Constants } from "../../..";
import { NotificacionsManager, SecurityHelper } from "../../../common";
import { CategoryRepository, ClientRepository, PromoRepository, TypeRepository } from "../../../data";
import { ClientProductRepository } from "../../../data/ClientProductRepository";
import { PromoViewModel } from "../PromoViewModel";
import { PromoState } from "./PromoState";
var DraftPromoState = /** @class */ (function (_super) {
    __extends(DraftPromoState, _super);
    function DraftPromoState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DraftPromoState.prototype.Initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SecurityHelper.GetCurrentUser()];
                    case 1:
                        currentUser = _a.sent();
                        SecurityHelper.SetPromoPermissions(this.Entity.ItemId, null, [currentUser.ItemId]);
                        return [2 /*return*/];
                }
            });
        });
    };
    DraftPromoState.prototype.GetStatusId = function () {
        return PromoStatus.Draft;
    };
    DraftPromoState.prototype.GetStatusText = function () {
        return Constants.StatusTexts.DraftPromo;
    };
    DraftPromoState.prototype.GetViewModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewModel, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        viewModel = new PromoViewModel(this.Entity);
                        _a = viewModel;
                        return [4 /*yield*/, ClientRepository.GetClients()];
                    case 1:
                        _a.Clients = _e.sent();
                        _b = viewModel;
                        return [4 /*yield*/, CategoryRepository.GetAll()];
                    case 2:
                        _b.Categories = _e.sent();
                        _c = viewModel;
                        return [4 /*yield*/, ClientProductRepository.GetAll()];
                    case 3:
                        _c.ClientProducts = _e.sent();
                        if (!(this.Entity.Items.length > 0 && this.Entity.Items[0].Category)) return [3 /*break*/, 5];
                        _d = viewModel;
                        return [4 /*yield*/, TypeRepository.GetByCategory(this.Entity.Items[0].Category.ItemId)];
                    case 4:
                        _d.Types = _e.sent();
                        _e.label = 5;
                    case 5:
                        viewModel.ShowSaveButton = true;
                        viewModel.ShowSubmitButton = true;
                        return [2 /*return*/, viewModel];
                }
            });
        });
    };
    DraftPromoState.prototype.Save = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                entity.ChangeState(PromoStatus.Draft);
                return [2 /*return*/, PromoRepository.SaveOrUpdate(entity)];
            });
        });
    };
    DraftPromoState.prototype.Submit = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entity.ChangeState(PromoStatus.Approval);
                        return [4 /*yield*/, this.InitializeWorkflowState(entity)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, PromoRepository.SaveOrUpdate(entity)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, entity.InitializeState()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, SecurityHelper.GetCurrentUser()];
                    case 4:
                        user = _a.sent();
                        return [2 /*return*/, NotificacionsManager.SendWorkflowStartedNotification(entity, user.Email)];
                }
            });
        });
    };
    return DraftPromoState;
}(PromoState));
export { DraftPromoState };
//# sourceMappingURL=DraftPromoState.js.map