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
import { CommonHelper } from "../../common/CommonHelper";
import { SecurityHelper } from "../../common/SecurityHelper";
var PromoWorkflowState = /** @class */ (function () {
    function PromoWorkflowState(approverIDs, completedBy) {
        this.ApproverIDs = [];
        this.CompletedBy = [];
        this.ApproverIDs = approverIDs;
        this.CompletedBy = completedBy || [];
    }
    PromoWorkflowState.prototype.IsComplete = function () {
        return this.ApproverIDs.length == this.CompletedBy.length;
    };
    PromoWorkflowState.prototype.UserCanApprove = function (userId) {
        return this.GetPendingUserIDs().indexOf(userId) != -1;
    };
    PromoWorkflowState.prototype.AddToCompletBy = function (userId) {
        if (this.ApproverIDs.indexOf(userId) != -1)
            this.CompletedBy.push(userId);
    };
    PromoWorkflowState.prototype.GetPendingUserIDs = function () {
        var _this = this;
        var userIDs = [];
        this.ApproverIDs.map(function (approverID) {
            if (_this.CompletedBy.indexOf(approverID) == -1)
                userIDs.push(approverID);
        });
        return userIDs;
    };
    PromoWorkflowState.prototype.GetPendingUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        users = [];
                        return [4 /*yield*/, Promise.all(this.GetPendingUserIDs().map(function (userId) { return __awaiter(_this, void 0, void 0, function () {
                                var user;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, SecurityHelper.GetUserById(userId)];
                                        case 1:
                                            user = _a.sent();
                                            if (!CommonHelper.IsNullOrEmpty(user.Email))
                                                users.push(user);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, users];
                }
            });
        });
    };
    return PromoWorkflowState;
}());
export { PromoWorkflowState };
//# sourceMappingURL=PromoWorkflowState.js.map