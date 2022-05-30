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
import { Entity } from "../../infrastructure";
import { NewPromoState, DraftPromoState } from "./PromoStates";
import { PromoStatus } from "./";
import { PromoItem } from "./PromoItem";
import { ApprovalState } from "./PromoStates/ApprovalState";
import { ApprovedState } from "./PromoStates/ApprovedState";
import { RejectedState } from "./PromoStates/RejectedState";
import { ProvenState } from "./PromoStates/ProvenState";
var Promo = /** @class */ (function (_super) {
    __extends(Promo, _super);
    function Promo(configuration) {
        var _this = _super.call(this) || this;
        _this.Name = "";
        _this.ActivityObjective = "";
        _this.WorkflowLog = [];
        _this.Evidence = [];
        _this.Approvals = "";
        _this.Config = configuration;
        _this.PromoID = _this.Config.CountryCode + "--";
        _this.Items = [new PromoItem({ AdditionalID: _this.PromoID + ".1", GetBaseGMSum: _this.GetBaseGMSum.bind(_this) })];
        _this.ChangeState(PromoStatus.New);
        return _this;
    }
    Promo.prototype.ChangeState = function (status) {
        switch (status) {
            case PromoStatus.New:
                this._state = new NewPromoState();
                break;
            case PromoStatus.Draft:
                this._state = new DraftPromoState();
                break;
            case PromoStatus.Approval:
                this._state = new ApprovalState();
                break;
            case PromoStatus.Approved:
                this._state = new ApprovedState();
                break;
            case PromoStatus.Rejected:
                this._state = new RejectedState();
                break;
            case PromoStatus.Proven:
                this._state = new ProvenState();
                break;
            default:
                break;
        }
        this._state.Entity = this;
    };
    Promo.prototype.InitializeState = function () {
        return this._state.Initialize();
    };
    Promo.prototype.GetStatusText = function () {
        return this._state.GetStatusText();
    };
    Promo.prototype.GetStatusId = function () {
        return this._state.GetStatusId();
    };
    Promo.prototype.GetPendingApproverIDs = function () {
        return this.GetStatusId() == PromoStatus.Approval ? this._state.GetCurrentStage().GetPendingUserIDs() : null;
    };
    Promo.prototype.GetViewModel = function () {
        return this._state.GetViewModel();
    };
    Promo.prototype.Save = function (entity) {
        return this._state.Save(entity);
    };
    Promo.prototype.Submit = function (entity) {
        return this._state.Submit(entity);
    };
    Promo.prototype.Approve = function (comments) {
        return this._state.Approve(comments);
    };
    Promo.prototype.Reject = function (comments) {
        return this._state.Reject(comments);
    };
    Promo.prototype.Proven = function (comments) {
        return this._state.Proven(comments);
    };
    Promo.prototype.GetBaseGMSum = function (category) {
        var value = 0;
        if (this.Items) {
            this.Items.map(function (item) {
                if (item.GetCategoryType() == category)
                    value += item.GetBaseGM();
            });
        }
        return value;
    };
    Promo.prototype.GetTotalEstimatedInvestment = function () {
        var value = 0;
        if (this.Items) {
            this.Items.map(function (item) {
                value += item.GetEstimatedInvestment() || 0;
            });
        }
        return value;
    };
    Promo.prototype.GetTotalEstimatedInvestmentAsString = function () {
        var value = this.GetTotalEstimatedInvestment();
        return value != null ? value.toLocaleString() : "0.00";
    };
    Promo.prototype.GetROI = function () {
        //Queda excluída la inversión adicional MKT de los cálculos por estar ya incluída 
        //en la inversión estimada (lo cual fue un cambio)
        var value = 0;
        var incrementalGM = 0;
        //let additionalInvestment: number = 0;
        var estimatedInvestment = this.GetTotalEstimatedInvestment();
        if (this.Items) {
            this.Items.map(function (item) {
                incrementalGM += item.GetIncrementalGM() || 0;
                //additionalInvestment += item.AdditionalInvestment || 0;
            });
            var investment = estimatedInvestment; // + additionalInvestment;
            value = investment > 0 ? incrementalGM / investment : 0;
        }
        return value;
    };
    Promo.prototype.GetROIAsString = function () {
        var value = this.GetROI();
        return value != null ? value.toFixed(2) : "0.00";
    };
    Promo.prototype.IsEffective = function () {
        var roi = this.GetROI();
        return (roi != null && roi >= 1);
    };
    Promo.prototype.GetFromDate = function () {
        return this.Items.reduce(function (prev, current) {
            return (prev.StartDate < current.StartDate) ? prev : current;
        }).StartDate;
    };
    Promo.prototype.GetToDate = function () {
        return this.Items.reduce(function (prev, current) {
            return (prev.EndDate > current.EndDate) ? prev : current;
        }).EndDate;
    };
    Promo.prototype.EvidenceHasChanges = function () {
        var hasChanges = false;
        this.Evidence.forEach(function (evidence) {
            if (evidence.File != null || evidence.Deleted) {
                hasChanges = true;
                return;
            }
        });
        return hasChanges;
    };
    return Promo;
}(Entity));
export { Promo };
//# sourceMappingURL=Promo.js.map