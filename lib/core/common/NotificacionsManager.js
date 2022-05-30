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
import { NotificationTemplateRepository } from "../data/NotificationTemplateRepository";
import { NotificationTemplateId } from "../model/Common";
import { CommonHelper } from "./CommonHelper";
import { sp } from "@pnp/sp/presets/all";
var NotificacionsManager = /** @class */ (function () {
    function NotificacionsManager() {
    }
    NotificacionsManager.SendWorkflowStartedNotification = function (entity, to, cc) {
        return NotificacionsManager.SendNotification(NotificationTemplateId.WorkflowStarted, entity, to, cc);
    };
    NotificacionsManager.SendTaskAssignedNotification = function (entity, to, cc, approver) {
        return NotificacionsManager.SendNotification(NotificationTemplateId.TaskAssigned, entity, to, cc, approver);
    };
    NotificacionsManager.SendTaskRejectedNotification = function (entity, comments, rejectedBy, to, cc) {
        return NotificacionsManager.SendNotification(NotificationTemplateId.TaskRejected, entity, to, cc, rejectedBy);
    };
    NotificacionsManager.SendTaskApprovedNotification = function (entity, approvedBy, to, cc) {
        return NotificacionsManager.SendNotification(NotificationTemplateId.TaskApproved, entity, to, cc, approvedBy);
    };
    NotificacionsManager.SendWorkflowApprovedNotification = function (entity, to, cc) {
        return NotificacionsManager.SendNotification(NotificationTemplateId.WorkflowApproved, entity, to, cc);
    };
    NotificacionsManager.SendNotification = function (notificationTemplateId, entity, to, cc, approver) {
        return __awaiter(this, void 0, void 0, function () {
            var template, replacements;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, NotificationTemplateRepository.GetByNotificationTemplateId(notificationTemplateId)];
                    case 1:
                        template = _a.sent();
                        return [4 /*yield*/, NotificacionsManager.GetReplacementCollection(notificationTemplateId, entity, to, cc, approver)];
                    case 2:
                        replacements = _a.sent();
                        //console.log(replacements);
                        replacements.forEach(function (value, key) {
                            return template.Subject = CommonHelper.replaceAll(template.Subject, key, value);
                        });
                        replacements.forEach(function (value, key) {
                            return template.Body = CommonHelper.replaceAll(template.Body, key, value);
                        });
                        //console.log(to);
                        //console.log(cc);
                        //console.log(template.Subject);
                        //console.log(template.Body);
                        NotificacionsManager.SendEmail(to, cc, template.Subject, template.Body);
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificacionsManager.GetReplacementCollection = function (notificationTemplateId, entity, to, cc, approver) {
        return __awaiter(this, void 0, void 0, function () {
            var retVal, webData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        retVal = new Map();
                        return [4 /*yield*/, sp.web.select("Url")()];
                    case 1:
                        webData = _a.sent();
                        retVal.set("{{ACTIVITY_OBJECTIVE}}", entity.ActivityObjective);
                        retVal.set("{{APPROVAL_AMOUNT_LIMIT}}", entity.Config.ApprovalAmountLimit.toString());
                        retVal.set("{{NAME}}", entity.Name);
                        retVal.set("{{PROMO_ID}}", entity.PromoID);
                        retVal.set("{{LINK_TO_PROMO}}", webData.Url + "?ItemId=" + entity.ItemId.toString());
                        retVal.set("{{KAM}}", entity.Client.KeyAccountManager.Value);
                        retVal.set("{{CLIENT_NAME}}", entity.Client.Name);
                        retVal.set("{{ADDITIONAL_INVESTMENT}}", entity.GetTotalEstimatedInvestmentAsString());
                        retVal.set("{{ROI}}", entity.GetROIAsString());
                        retVal.set("{{PROMO_DATE}}", NotificacionsManager.GetFormattedPromoDate(entity));
                        retVal.set("{{CURRENCY_SYMBOL}}", entity.Config.CurrencySymbol);
                        /*Validar*/
                        if (!CommonHelper.IsNullOrEmpty(approver))
                            retVal.set("{{TASK_APPROVER}}", approver);
                        /* Fin Validar*/
                        retVal.set("{{CC}}", cc);
                        retVal.set("{{TO}}", to);
                        return [2 /*return*/, retVal];
                }
            });
        });
    };
    NotificacionsManager.GetFormattedPromoDate = function (entity) {
        return "Desde " + entity.GetFromDate().toLocaleDateString() + " hasta " + entity.GetToDate().toLocaleDateString();
    };
    NotificacionsManager.SendEmail = function (to, cc, subject, body) {
        return __awaiter(this, void 0, void 0, function () {
            var emailProps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emailProps = {
                            To: to.split(";"),
                            CC: !CommonHelper.IsNullOrEmpty(cc) ? cc.split(";") : [],
                            Subject: subject,
                            Body: body,
                            AdditionalHeaders: {
                                "content-type": "text/html"
                            }
                        };
                        return [4 /*yield*/, sp.utility.sendEmail(emailProps)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return NotificacionsManager;
}());
export { NotificacionsManager };
//# sourceMappingURL=NotificacionsManager.js.map