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
import { NotificacionsManager } from "../../../common/NotificacionsManager";
import { SecurityHelper } from "../../../common/SecurityHelper";
import { PromoRepository } from "../../../data";
import { WorkflowLogRepository } from "../../../data/WorkflowLogRepository";
import { PromoViewModel } from "../PromoViewModel";
import { PromoState } from "./PromoState";
var ApprovalState = /** @class */ (function (_super) {
    __extends(ApprovalState, _super);
    function ApprovalState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApprovalState.prototype.Initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.GetCurrentStage().GetPendingUsers()];
                    case 1:
                        users = _a.sent();
                        return [4 /*yield*/, SecurityHelper.SetPromoPermissions(this.Entity.ItemId, [this.Entity.Client.KeyAccountManager.ItemId], this.GetCurrentStage().GetPendingUserIDs())];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(users.map(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, NotificacionsManager.SendTaskAssignedNotification(this.Entity, user.Email, null, user.Value)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ApprovalState.prototype.GetStatusId = function () {
        return PromoStatus.Approval;
    };
    ApprovalState.prototype.GetStatusText = function () {
        return Constants.StatusTexts.Approval;
    };
    ApprovalState.prototype.GetViewModel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewModel, currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewModel = new PromoViewModel(this.Entity);
                        viewModel.ReadOnlyForm = true;
                        return [4 /*yield*/, SecurityHelper.GetCurrentUser()];
                    case 1:
                        currentUser = _a.sent();
                        console.log(viewModel);
                        if (this.GetCurrentStage().UserCanApprove(currentUser.ItemId) &&
                            viewModel.Entity.TipoFlujo != "") {
                            viewModel.ShowApproveButton = true;
                            viewModel.ShowRejectButton = true;
                        }
                        return [2 /*return*/, viewModel];
                }
            });
        });
    };
    ApprovalState.prototype.Approve = function (comments) {
        return __awaiter(this, void 0, void 0, function () {
            var stage, user, kam, to, users, readerIDs, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stage = this.GetCurrentStage();
                        return [4 /*yield*/, SecurityHelper.GetCurrentUser()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, SecurityHelper.GetUserById(this.Entity.Client.KeyAccountManager.ItemId)];
                    case 2:
                        kam = _a.sent();
                        stage.AddToCompletBy(user.ItemId);
                        if (!stage.IsComplete()) return [3 /*break*/, 6];
                        if (!(this.Entity.CurrentStageNumber == this.Entity.WorkflowStages.length)) return [3 /*break*/, 3];
                        this.Entity.ChangeState(PromoStatus.Approved);
                        to = kam.Email;
                        NotificacionsManager.SendWorkflowApprovedNotification(this.Entity, to);
                        return [3 /*break*/, 6];
                    case 3:
                        this.Entity.CurrentStageNumber++;
                        return [4 /*yield*/, this.GetCurrentStage().GetPendingUsers()];
                    case 4:
                        users = _a.sent();
                        return [4 /*yield*/, Promise.all(users.map(function (usr) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, NotificacionsManager.SendTaskAssignedNotification(this.Entity, usr.Email, null, usr.Value)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }))];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        readerIDs = [this.Entity.Client.KeyAccountManager.ItemId];
                        for (i = 0; i < this.Entity.CurrentStageNumber; i++)
                            readerIDs = readerIDs.concat(this.Entity.WorkflowStages[i].CompletedBy);
                        return [4 /*yield*/, SecurityHelper.SetPromoPermissions(this.Entity.ItemId, readerIDs, this.GetCurrentStage().GetPendingUserIDs())];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, PromoRepository.SaveOrUpdate(this.Entity, 1)];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, WorkflowLogRepository.Save(this.Entity.ItemId, this.Entity.PromoID, "Aprobar", comments, this.Entity)];
                    case 9:
                        _a.sent();
                        return [2 /*return*/, NotificacionsManager.SendTaskApprovedNotification(this.Entity, user.Value, kam.Email)];
                }
            });
        });
    };
    ApprovalState.prototype.Reject = function (comments) {
        return __awaiter(this, void 0, void 0, function () {
            var stage, user, readerIDs, i, to;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        stage = this.GetCurrentStage();
                        return [4 /*yield*/, SecurityHelper.GetCurrentUser()];
                    case 1:
                        user = _a.sent();
                        this.Entity.ChangeState(PromoStatus.Rejected);
                        stage.AddToCompletBy(user.ItemId);
                        return [4 /*yield*/, PromoRepository.SaveOrUpdate(this.Entity, 1)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, WorkflowLogRepository.Save(this.Entity.ItemId, this.Entity.PromoID, "Rechazar", comments, this.Entity)];
                    case 3:
                        _a.sent();
                        readerIDs = [this.Entity.Client.KeyAccountManager.ItemId];
                        for (i = 0; i < this.Entity.CurrentStageNumber; i++)
                            readerIDs = readerIDs.concat(this.Entity.WorkflowStages[i].CompletedBy);
                        readerIDs = readerIDs.concat(stage.GetPendingUserIDs());
                        return [4 /*yield*/, SecurityHelper.SetPromoPermissions(this.Entity.ItemId, readerIDs)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, SecurityHelper.GetUserById(this.Entity.Client.KeyAccountManager.ItemId)];
                    case 5:
                        to = (_a.sent()).Email;
                        return [2 /*return*/, NotificacionsManager.SendTaskRejectedNotification(this.Entity, comments, user.Value, to)];
                }
            });
        });
    };
    return ApprovalState;
}(PromoState));
export { ApprovalState };
//# sourceMappingURL=ApprovalState.js.map