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
import { Constants } from "../../..";
import { ApproversRepository } from "../../../data/ApproversRepository";
import { PromoWorkflowState } from "../PromoWorkflowState";
var PromoState = /** @class */ (function () {
    function PromoState() {
    }
    PromoState.prototype.Initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    PromoState.prototype.Save = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error(Constants.Messages.NotAllowedAction);
            });
        });
    };
    PromoState.prototype.Submit = function (entity) {
        throw new Error(Constants.Messages.NotAllowedAction);
    };
    PromoState.prototype.Approve = function (comments) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error(Constants.Messages.NotAllowedAction);
            });
        });
    };
    PromoState.prototype.Reject = function (comments) {
        return;
        //throw new Error(Constants.Messages.NotAllowedAction);
    };
    PromoState.prototype.Proven = function (comments) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    PromoState.prototype.FlowAsign = function (entity, comments, flowType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    PromoState.prototype.InitializeWorkflowState = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var approvers, kamUserId, teamLeader, approverUserId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ApproversRepository.GetInstance()];
                    case 1:
                        approvers = _a.sent();
                        kamUserId = entity.Client.Channel.HeadOfChannel.ItemId;
                        teamLeader = entity.Client.teamLeader;
                        approverUserId = approvers.Phase1Approver1.ItemId;
                        if (entity.TipoFlujo == null) {
                            entity.WorkflowStages = [new PromoWorkflowState([
                                    approvers.Phase0Coordinator1.ItemId,
                                    approvers.Phase0Coordinator2.ItemId,
                                    approvers.Phase0Coordinator3.ItemId
                                ])];
                        }
                        else {
                            if (entity.TipoFlujo.ItemId == 1) {
                                entity.WorkflowStages = [new PromoWorkflowState([
                                        approvers.Phase1Approver1.ItemId
                                    ])];
                            }
                            else if (entity.TipoFlujo.ItemId == 2) {
                                entity.WorkflowStages = [new PromoWorkflowState([
                                        teamLeader.ItemId,
                                        kamUserId,
                                        approvers.Phase2Approver1.ItemId
                                    ])];
                            }
                            else if (entity.TipoFlujo.ItemId == 3) {
                                entity.WorkflowStages = [new PromoWorkflowState([
                                        teamLeader.ItemId,
                                        kamUserId,
                                        approvers.Phase2Approver1.ItemId,
                                        approvers.Phase3Approver1.ItemId,
                                        approvers.Phase3Approver2.ItemId
                                    ])];
                            }
                        }
                        // if (kamUserId != approverUserId)
                        //     entity.WorkflowStages = [new PromoWorkflowState([kamUserId, approverUserId])];
                        // else
                        //     entity.WorkflowStages = [new PromoWorkflowState([kamUserId])];
                        // if (entity.GetTotalEstimatedInvestment() > entity.Config.ApprovalAmountLimit) {
                        //     const approver1 = approvers.Phase2Approver1.ItemId;
                        //     const approver2 = approvers.Phase3Approver1.ItemId;
                        //     if (approver1 != approver2)
                        //         entity.WorkflowStages.push(new PromoWorkflowState([approver1, approver2]));
                        //     else
                        //         entity.WorkflowStages.push(new PromoWorkflowState([approver1]));
                        // }
                        entity.CurrentStageNumber = 1;
                        return [2 /*return*/];
                }
            });
        });
    };
    PromoState.prototype.GetCurrentStage = function () {
        return this.Entity.CurrentStageNumber > 0 ? this.Entity.WorkflowStages[this.Entity.CurrentStageNumber - 1] : null;
    };
    return PromoState;
}());
export { PromoState };
//# sourceMappingURL=PromoState.js.map