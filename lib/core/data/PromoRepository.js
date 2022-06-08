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
import { ClientRepository, ConfigurationRepository } from ".";
import { PromoWorkflowState } from "../model/Promo";
import { Promo } from "../model/Promo/Promo";
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
            var pendingApprovers, data, iar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pendingApprovers = entity.GetPendingApproverIDs();
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
                            Approvals: entity.Approvals,
                            TipoFlujoId: entity.TipoFlujo ? entity.TipoFlujo.ItemId : null
                        };
                        if (!!entity.ItemId) return [3 /*break*/, 3];
                        return [4 /*yield*/, sp.web.lists.getByTitle(PromoRepository.LIST_NAME).items.add(data)];
                    case 1:
                        iar = _a.sent();
                        //TODO: Obtener prefijo de país desde configuración
                        entity.ItemId = iar.data.ID;
                        entity.PromoID = entity.Config.CountryCode + iar.data.ID;
                        return [4 /*yield*/, sp.web.lists.getByTitle(PromoRepository.LIST_NAME).items.getById(iar.data.ID).update({
                                Title: entity.PromoID,
                                PromoLink: entity.PromoID
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, sp.web.lists.getByTitle(PromoRepository.LIST_NAME).items.getById(entity.ItemId).update(data)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, PromoItemRepository.SaveOrUpdateItems(entity.ItemId, entity.PromoID, entity.Items)];
                    case 6:
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
            var entity, lengthDataIDS, lenghtDataComplete, datosComplete, dataIDS, dataComplete, i, numero, i, numero, workFlowState;
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
                        entity.TipoFlujo = flowtype;
                        items.map(function (promoItem) {
                            promoItem.GetBaseGMSum = entity.GetBaseGMSum.bind(entity);
                        });
                        entity.Items = items;
                        if (item.SYS_WorkflowStages) {
                            entity.WorkflowStages = [];
                            lengthDataIDS = item.SYS_WorkflowStages.split('[')[2].split(']')[0].split(',').length;
                            lenghtDataComplete = item.SYS_WorkflowStages.split('[')[3].split(']')[0].split(',').length;
                            datosComplete = item.SYS_WorkflowStages.split('[')[3].split(']')[0].split(',');
                            dataIDS = [];
                            dataComplete = [];
                            for (i = 0; i < lengthDataIDS; i++) {
                                numero = parseInt(item.SYS_WorkflowStages.split('[')[2].split(']')[0].split(',')[i], 10);
                                if (dataIDS.indexOf(numero) == -1)
                                    dataIDS.push(numero);
                            }
                            if (datosComplete.length >= 1 && datosComplete[0] != "")
                                for (i = 0; i < lenghtDataComplete; i++) {
                                    numero = parseInt(item.SYS_WorkflowStages.split('[')[3].split(']')[0].split(',')[i], 10);
                                    if (dataComplete.indexOf(numero) == -1)
                                        dataComplete.push(numero);
                                }
                            workFlowState = new PromoWorkflowState(dataIDS, dataComplete);
                            entity.WorkflowStages = [workFlowState];
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