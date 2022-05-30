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
import { Approvers } from "../model/Common/Approvers/Approvers";
import { ApproverItem } from "../model/Common/Approvers/ApproverItem";
import { ApproverKeys } from "../model/Common/Approvers/ApproverKeys";
var ApproversRepository = /** @class */ (function () {
    function ApproversRepository() {
    }
    ApproversRepository.GetInstance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(ApproversRepository._instance == null)) return [3 /*break*/, 2];
                        _a = ApproversRepository;
                        return [4 /*yield*/, ApproversRepository.GetApprovers()];
                    case 1:
                        _a._instance = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, ApproversRepository._instance];
                }
            });
        });
    };
    ApproversRepository.GetApprovers = function () {
        var entity = ApproversRepository.GetValues().then(function (items) {
            var approvers = new Approvers();
            approvers.Phase0Coordinator1 = ApproversRepository.GetApproverValue(items, ApproverKeys.Phase0Coordinator1);
            approvers.Phase0Coordinator2 = ApproversRepository.GetApproverValue(items, ApproverKeys.Phase0Coordinator2);
            approvers.Phase0Coordinator3 = ApproversRepository.GetApproverValue(items, ApproverKeys.Phase0Coordinator3);
            approvers.Phase1Approver1 = ApproversRepository.GetApproverValue(items, ApproverKeys.Phase1Approver1);
            approvers.Phase2Approver1 = ApproversRepository.GetApproverValue(items, ApproverKeys.Phase2Approver1);
            approvers.Phase3Approver1 = ApproversRepository.GetApproverValue(items, ApproverKeys.Phase3Approver1);
            approvers.Phase3Approver2 = ApproversRepository.GetApproverValue(items, ApproverKeys.Phase3Approver2);
            return approvers;
        });
        return entity;
    };
    ApproversRepository.GetApproverValue = function (items, role) {
        var appoverItem = items.filter(function (x) { return x.Role.toLowerCase() === role.toLowerCase(); })[0];
        if (appoverItem == null) {
            console.log("Approver item for role '%s' not found.", role);
            return null;
        }
        if (appoverItem.User == null)
            console.log("Approver value for key '%s' is empty.", role);
        return appoverItem.User;
    };
    ApproversRepository.GetValues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                collection = sp.web.lists.getByTitle(ApproversRepository.LIST_NAME)
                    .items.select("ID", "Role", "User/ID", "User/Title")
                    .expand("User")
                    .get().then(function (items) {
                    return items.map(function (item) {
                        return ApproversRepository.BuildEntity(item);
                    });
                });
                return [2 /*return*/, collection];
            });
        });
    };
    ApproversRepository.BuildEntity = function (item) {
        var entity = new ApproverItem();
        entity.ItemId = item.ID;
        entity.Role = item.Role;
        entity.User = item.User ? { ItemId: item.User.ID, Value: item.User.Title } : null;
        return entity;
    };
    ApproversRepository.LIST_NAME = "Aprobadores";
    return ApproversRepository;
}());
export { ApproversRepository };
//# sourceMappingURL=ApproversRepository.js.map