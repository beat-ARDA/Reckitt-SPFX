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
import { concat } from "lodash";
import { ClientRepository, ConfigurationRepository } from ".";
import { PromoWorkflowState } from "../model/Promo";
import { Promo } from "../model/Promo/Promo";
import { ApproversRepository } from "./ApproversRepository";
import { FlowApproversRepository } from "./FlowApproversRepository";
import { EvidenceRepository } from "./EvidenceRepository";
import { PromoItemRepository } from "./PromoItemRepository";
import { WorkflowLogRepository } from "./WorkflowLogRepository";
var PromoRepository = /** @class */ (function () {
    function PromoRepository() {
    }
    PromoRepository.GetById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var item, items, client, _a, workflowLog, evidence, flowtype, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getByTitle(PromoRepository.LIST_NAME)
                            .items.getById(id).select("ID", "Title", "PromoName", "ActivityObjective", "ClientId", "StatusId", "SYS_WorkflowStages", "SYS_CurrentStageNumber", "Approvals", "TipoFlujoId").get()];
                    case 1:
                        item = _c.sent();
                        return [4 /*yield*/, PromoItemRepository.GetByPromo(item.ID, item.ClientId)];
                    case 2:
                        items = _c.sent();
                        if (!item.ClientId) return [3 /*break*/, 4];
                        return [4 /*yield*/, ClientRepository.GetById(item.ClientId)];
                    case 3:
                        _a = _c.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        _a = null;
                        _c.label = 5;
                    case 5:
                        client = _a;
                        return [4 /*yield*/, WorkflowLogRepository.GetByPromo(item.ID)];
                    case 6:
                        workflowLog = _c.sent();
                        return [4 /*yield*/, EvidenceRepository.GetByPromoID(item.Title)];
                    case 7:
                        evidence = _c.sent();
                        if (!item.TipoFlujoId) return [3 /*break*/, 9];
                        return [4 /*yield*/, FlowApproversRepository.GetById(item.TipoFlujoId)];
                    case 8:
                        _b = _c.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        _b = null;
                        _c.label = 10;
                    case 10:
                        flowtype = _b;
                        return [2 /*return*/, PromoRepository.BuildEntity(item, items, client, workflowLog, evidence, flowtype)];
                }
            });
        });
    };
    PromoRepository.SaveOrUpdate = function (entity, sU) {
        if (sU === void 0) { sU = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var pendingApprovers, aprobadores, approvers, kamUserId, approverUserId, kamUser, approverUser, approver1Id, approver2Id, approver1, approver2, data, iar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pendingApprovers = entity.GetPendingApproverIDs();
                        if (!(sU == 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, ApproversRepository.GetInstance()];
                    case 1:
                        approvers = _a.sent();
                        kamUserId = entity.Client.Channel.HeadOfChannel.ItemId;
                        approverUserId = approvers.Phase1Approver1.ItemId;
                        kamUser = entity.Client.Channel.HeadOfChannel.Value;
                        approverUser = approvers.Phase1Approver1.Value;
                        if (kamUser != approverUser)
                            aprobadores = concat(kamUserId + "-" + kamUser + ": " + "Pendiente| " + approverUserId + "-" + approverUser + ": " + "Pendiente|").toString();
                        else
                            aprobadores = concat(kamUserId + "-" + kamUser + ": " + "Pendiente|").toString();
                        if (entity.GetTotalEstimatedInvestment() > entity.Config.ApprovalAmountLimit) {
                            approver1Id = approvers.Phase3Approver1.ItemId;
                            approver2Id = approvers.Phase3Approver2.ItemId;
                            approver1 = approvers.Phase3Approver1.Value;
                            approver2 = approvers.Phase3Approver2.Value;
                            if (approver1 != approver2)
                                aprobadores = concat(aprobadores + " " + approver1Id + "-" + approver1 + ": Pendiente| " + approver2Id + "-" + approver2 + ": Pendiente|").toString();
                            else
                                aprobadores = concat(aprobadores + " " + approver1Id + "-" + approver1 + ": Pendiente| ").toString();
                        }
                        _a.label = 2;
                    case 2:
                        data = {
                            PromoName: entity.Name,
                            ActivityObjective: entity.ActivityObjective,
                            ClientId: entity.Client ? entity.Client.ItemId : null,
                            TotalEstimatedROI: entity.GetROI(),
                            StartDate: entity.GetFromDate(),
                            EndDate: entity.GetToDate(),
                            Status: entity.GetStatusText(),
                            StatusId: entity.GetStatusId(),
                            SYS_WorkflowStages: entity.WorkflowStages ? JSON.stringify(entity.WorkflowStages) : null,
                            SYS_CurrentStageNumber: entity.CurrentStageNumber,
                            PendingApproversId: { results: pendingApprovers ? entity.GetPendingApproverIDs() : [] },
                            TotalEstimatedInvestment: entity.GetTotalEstimatedInvestment(),
                            Approvals: aprobadores,
                            TipoFlujoId: entity.TipoFlujo ? entity.TipoFlujo.ItemId : null
                        };
                        if (!!entity.ItemId) return [3 /*break*/, 5];
                        return [4 /*yield*/, sp.web.lists.getByTitle(PromoRepository.LIST_NAME).items.add(data)];
                    case 3:
                        iar = _a.sent();
                        //TODO: Obtener prefijo de país desde configuración
                        entity.ItemId = iar.data.ID;
                        entity.PromoID = entity.Config.CountryCode + iar.data.ID;
                        return [4 /*yield*/, sp.web.lists.getByTitle(PromoRepository.LIST_NAME).items.getById(iar.data.ID).update({
                                Title: entity.PromoID,
                                PromoLink: entity.PromoID
                            })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, sp.web.lists.getByTitle(PromoRepository.LIST_NAME).items.getById(entity.ItemId).update(data)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, PromoItemRepository.SaveOrUpdateItems(entity.ItemId, entity.PromoID, entity.Items)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PromoRepository.GetNewPromo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var configuration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ConfigurationRepository.GetInstance()];
                    case 1:
                        configuration = _a.sent();
                        return [2 /*return*/, new Promo(configuration)];
                }
            });
        });
    };
    PromoRepository.BuildEntity = function (item, items, client, workflowLog, evidence, flowtype) {
        return __awaiter(this, void 0, void 0, function () {
            var entity, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, PromoRepository.GetNewPromo()];
                    case 1:
                        entity = _a.sent();
                        entity.ItemId = item.ID;
                        entity.Name = item.PromoName;
                        entity.PromoID = item.Title;
                        entity.ActivityObjective = item.ActivityObjective;
                        entity.Client = client;
                        entity.CurrentStageNumber = item.SYS_CurrentStageNumber;
                        entity.WorkflowLog = workflowLog;
                        entity.Evidence = evidence;
                        //entity.TipoFlujo = item.TipoFlujo.Title == undefined ? null : item.TipoFlujo.Title;
                        entity.TipoFlujo = flowtype;
                        items.map(function (promoItem) {
                            promoItem.GetBaseGMSum = entity.GetBaseGMSum.bind(entity);
                        });
                        entity.Items = items;
                        if (item.SYS_WorkflowStages) {
                            data = JSON.parse(item.SYS_WorkflowStages);
                            entity.WorkflowStages = [];
                            data.map(function (stage) {
                                entity.WorkflowStages.push(new PromoWorkflowState(stage.ApproverIDs, stage.CompletedBy));
                            });
                        }
                        entity.ChangeState(parseInt(item.StatusId));
                        return [2 /*return*/, entity];
                }
            });
        });
    };
    PromoRepository.LIST_NAME = "Promociones";
    return PromoRepository;
}());
export { PromoRepository };
//# sourceMappingURL=PromoRepository.js.map