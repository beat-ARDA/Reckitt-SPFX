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
import { SecurityHelper } from "../common/SecurityHelper";
import { WorkflowLog } from "../model/Common/WorkflowLog";
import { PromoRepository } from "./PromoRepository";
import { concat } from "lodash";
var WorkflowLogRepository = /** @class */ (function () {
    function WorkflowLogRepository() {
    }
    WorkflowLogRepository.GetByPromo = function (promoId) {
        var collection = sp.web.lists.getByTitle(WorkflowLogRepository.LIST_NAME)
            .items.select("ID", "DateAndTime", "User/ID", "User/Title", "Action", "Comments").expand("User").filter("PromoId eq " + promoId).getAll().then(function (items) {
            return items.map(function (item) {
                return WorkflowLogRepository.BuildEntity(item);
            });
        });
        return collection;
    };
    WorkflowLogRepository.Save = function (promoItemId, promoID, action, comments, entity) {
        return __awaiter(this, void 0, void 0, function () {
            var date, currentUser, data, apr, aprobadores, encontrado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        return [4 /*yield*/, SecurityHelper.GetCurrentUser()];
                    case 1:
                        currentUser = _a.sent();
                        data = {
                            Title: promoID + "_" + date.toISOString(),
                            PromoId: promoItemId,
                            DateAndTime: date,
                            UserId: currentUser.ItemId,
                            Action: action,
                            Comments: comments
                        };
                        return [4 /*yield*/, sp.web.lists.getByTitle(WorkflowLogRepository.LIST_NAME).items.add(data)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, sp.web.lists.getByTitle(PromoRepository.LIST_NAME)
                                .items.getById(entity.ItemId).select("Approvals").get()];
                    case 3:
                        apr = _a.sent();
                        aprobadores = "";
                        encontrado = false;
                        apr.Approvals.split("|").map(function (data) {
                            if (Number(data.split("-")[0]) == currentUser.ItemId && !encontrado) {
                                console.log(data);
                                console.log(data.replace("Pendiente", action));
                                if (data.replace("Pendiente", action) !== data) {
                                    aprobadores = concat(aprobadores + data.replace("Pendiente", action) + "|").toString();
                                    encontrado = true;
                                }
                                else
                                    data != null || data != "" || data ? aprobadores = concat(aprobadores + data + "|").toString() : null;
                            }
                            else
                                data != null || data != "" || data ? aprobadores = concat(aprobadores + data + "|").toString() : null;
                        });
                        if (!(aprobadores !== "")) return [3 /*break*/, 5];
                        return [4 /*yield*/, sp.web.lists.getByTitle(PromoRepository.LIST_NAME).items.getById(promoItemId).update({
                                Approvals: aprobadores
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    WorkflowLogRepository.BuildEntity = function (item) {
        var entity = new WorkflowLog();
        entity.ItemId = item.ID;
        entity.DateAndTime = new Date(item.DateAndTime);
        entity.User = item.User ? { ItemId: item.User.ID, Value: item.User.Title } : null;
        entity.Action = item.Action;
        entity.Comments = item.Comments;
        return entity;
    };
    WorkflowLogRepository.LIST_NAME = "Workflow log";
    return WorkflowLogRepository;
}());
export { WorkflowLogRepository };
//# sourceMappingURL=WorkflowLogRepository.js.map