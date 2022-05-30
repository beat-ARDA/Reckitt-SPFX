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
import { CommonHelper } from "../../common/CommonHelper";
import { Entity } from "../../infrastructure";
import { CategoryType } from "../Common";
var PromoItem = /** @class */ (function (_super) {
    __extends(PromoItem, _super);
    function PromoItem(init) {
        var _this = _super.call(this) || this;
        _this.AdditionalID = "";
        _this.ShortDescription = "";
        _this.CappedActivity = false;
        _this.DiscountPerPiece = null;
        _this.NetPrice = null;
        _this.COGS = null;
        Object.assign(_this, init);
        return _this;
    }
    PromoItem.prototype.GetCategoryType = function () {
        if (this.Category) {
            switch (this.Category.Identifier) {
                case "{05BFEA39-DDD9-47D9-AAB4-2DAD6CAAABEB}":
                    return CategoryType.Performance;
                case "{5FF4CFF7-B36A-4CDC-99DA-A9A6DDFFC479}":
                    return CategoryType.ConsumerPromo;
                case "{2557D5A6-4DCA-4408-8CE5-84118914AA18}":
                    return CategoryType.Rollback;
                case "{786781CB-648F-433B-B719-6E0265058B5E}":
                    return CategoryType.SpecialExhibitions;
                case "{B4FF9158-9ED9-4FFB-9122-52D2D0AAC1F6}":
                    return CategoryType.Visibility;
                case "{B0C68395-D045-4786-928C-CF8620D6BB52}":
                    return CategoryType.Institutional;
                default:
                    return CategoryType.Unknown;
            }
        }
        return CategoryType.Unknown;
    };
    //#region Required fields
    //TODO: Los métodos que retornan "true" se deben eliminar una vez que se confirme que todo funciona correctamente
    PromoItem.prototype.RequiresInvestment = function () {
        switch (this.GetCategoryType()) {
            case CategoryType.Performance:
            case CategoryType.SpecialExhibitions:
            case CategoryType.Visibility:
            case CategoryType.Institutional:
                return true;
            default:
                return false;
        }
    };
    PromoItem.prototype.RequiresNetPrice = function () {
        /*         switch (this.GetCategoryType()) {
                    case CategoryType.SpecialExhibitions:
                    case CategoryType.Institutional:
                    case CategoryType.Unknown:
                        return false;
                    default:
                        return true;
                } */
        return true;
    };
    PromoItem.prototype.RequiresDiscountPerPiece = function () {
        switch (this.GetCategoryType()) {
            case CategoryType.ConsumerPromo:
            case CategoryType.Rollback:
                return true;
            default:
                return false;
        }
    };
    PromoItem.prototype.RequiresRedemption = function () {
        return this.GetCategoryType() == CategoryType.ConsumerPromo && this.Type && this.Type.Name.toLowerCase() == "redemption";
    };
    PromoItem.prototype.RequiresTotalEstimatedVolume = function () {
        switch (this.GetCategoryType()) {
            case CategoryType.SpecialExhibitions:
            case CategoryType.Unknown:
                return false;
            default:
                return true;
        }
    };
    PromoItem.prototype.RequiresIncrementalVolumePercentage = function () {
        return this.RequiresTotalEstimatedVolume();
    };
    PromoItem.prototype.RequiresBaseNR = function () {
        //return this.GetCategoryType() != CategoryType.Institutional;
        return true;
    };
    PromoItem.prototype.RequiresEstimatedNR = function () {
        //return this.GetCategoryType() != CategoryType.Institutional;
        return true;
    };
    PromoItem.prototype.RequiresIncrementalEstimatedNR = function () {
        //return this.GetCategoryType() != CategoryType.Institutional;
        return true;
    };
    PromoItem.prototype.RequiresBaseGM = function () {
        //return this.RequiresNetPrice();
        return true;
    };
    PromoItem.prototype.RequiresEstimatedGMPromo = function () {
        //return this.RequiresTotalEstimatedVolume();
        return true;
    };
    PromoItem.prototype.RequiresIncrementalGM = function () {
        /*         switch (this.GetCategoryType()) {
                    case CategoryType.SpecialExhibitions:
                    case CategoryType.Institutional:
                    case CategoryType.Visibility:
                    case CategoryType.Performance:
                    case CategoryType.Unknown:
                        return false;
                    default:
                        return true;
                } */
        return true;
    };
    //#endregion
    //#region Calculated values
    PromoItem.prototype.GetDiscountPercentage = function () {
        if (this.RequiresDiscountPerPiece() && this.NetPrice > 0)
            return (this.DiscountPerPiece / this.NetPrice) * 100;
        return null;
    };
    PromoItem.prototype.GetBEPNR = function () {
        if (this.GetCategoryType() == CategoryType.ConsumerPromo) {
            if (this.NetPrice > 0 && this.BaseVolume > 0)
                return (this.GetEstimatedInvestment() / this.NetPrice / this.BaseVolume) * 100;
        }
        else {
            if (this.NetPrice != null)
                return (this.NetPrice / (this.NetPrice - this.DiscountPerPiece || 0) - 1) * 100;
        }
        return null;
    };
    PromoItem.prototype.GetGMPercentageNR = function () {
        if (this.NetPrice > 0)
            return ((this.NetPrice - this.COGS) / this.NetPrice) * 100;
        return null;
    };
    PromoItem.prototype.GetGMPercentageNRWithPromo = function () {
        if (this.RequiresDiscountPerPiece() && this.NetPrice > 0)
            return ((this.NetPrice - this.DiscountPerPiece - this.COGS) / this.NetPrice) * 100;
        return null;
    };
    PromoItem.prototype.GetGMBaseUnit = function () {
        return this.NetPrice - this.COGS;
    };
    PromoItem.prototype.GetGMPromoUnit = function () {
        return this.NetPrice - this.DiscountPerPiece - this.COGS;
    };
    PromoItem.prototype.GetBEPGM = function () {
        var gmBaseUnit = this.GetGMBaseUnit();
        if (this.RequiresDiscountPerPiece()) {
            if (this.GetCategoryType() == CategoryType.ConsumerPromo) {
                if (gmBaseUnit > 0 && this.BaseVolume > 0)
                    return (this.GetEstimatedInvestment() / gmBaseUnit / this.BaseVolume) * 100;
            }
            else {
                var gmPromoUnit = this.GetGMPromoUnit();
                if (gmPromoUnit > 0)
                    return (gmBaseUnit / gmPromoUnit - 1) * 100;
            }
        }
        return null;
    };
    PromoItem.prototype.GetLastYearVolume = function () {
        if (this.LastYearVolumes && CommonHelper.IsDate(this.StartDate) && CommonHelper.IsDate(this.EndDate) && this.EndDate >= this.StartDate) {
            var currentDate = new Date(this.StartDate.getTime());
            var currentMonth = currentDate.getMonth();
            var dailyVolume = this.LastYearVolumes.GetDailyVolume(currentDate.getFullYear() - 1, currentMonth);
            var volume = 0;
            while (this.EndDate >= currentDate) {
                volume += dailyVolume;
                currentDate.setDate(currentDate.getDate() + 1);
                var month = currentDate.getMonth();
                if (month != currentMonth) {
                    currentMonth = month;
                    dailyVolume = this.LastYearVolumes.GetDailyVolume(currentDate.getFullYear() - 1, currentMonth);
                }
            }
            return volume;
        }
        return null;
    };
    PromoItem.prototype.GetAverageVolumeL3Months = function () {
        if (this.LastYearVolumes && CommonHelper.IsDate(this.StartDate))
            return this.LastYearVolumes.GetAverageVolumeL3Months(this.StartDate.getMonth());
        return null;
    };
    PromoItem.prototype.GetTotalEstimatedVolume = function () {
        return this.RequiresTotalEstimatedVolume() ? (this.BaseVolume || 0) + (this.EstimatedIncrementalVolume || 0) : null;
    };
    PromoItem.prototype.GetIncrementalVolumePercentage = function () {
        if (this.RequiresIncrementalVolumePercentage())
            return this.BaseVolume > 0 ? ((this.EstimatedIncrementalVolume || 0) / this.BaseVolume) * 100 : 0;
        return null;
    };
    PromoItem.prototype.GetBaseNR = function () {
        if (this.RequiresBaseNR())
            return (this.BaseVolume || 0) * (this.NetPrice || 0);
        return null;
    };
    PromoItem.prototype.GetEstimatedNR = function () {
        if (this.RequiresEstimatedNR()) {
            if (this.GetCategoryType() == CategoryType.ConsumerPromo)
                return (this.GetTotalEstimatedVolume() || 0) * (this.NetPrice || 0) - (this.GetEstimatedInvestment() || 0);
            else
                return (this.GetTotalEstimatedVolume() || 0) * ((this.NetPrice || 0) - (this.RequiresDiscountPerPiece() ? (this.DiscountPerPiece || 0) : 0));
        }
        return null;
    };
    PromoItem.prototype.GetIncrementalEstimatedNR = function () {
        if (this.RequiresIncrementalEstimatedNR()) {
            return (this.GetEstimatedNR() || 0) - (this.GetBaseNR() || 0);
        }
        return null;
    };
    PromoItem.prototype.GetBaseGM = function () {
        if (this.RequiresBaseGM())
            return (this.BaseVolume || 0) * (this.GetGMBaseUnit() || 0);
        return null;
    };
    PromoItem.prototype.GetEstimatedGMPromo = function () {
        if (this.RequiresEstimatedGMPromo())
            return (this.GetTotalEstimatedVolume() || 0) * (this.GetGMBaseUnit() || 0);
        return null;
    };
    PromoItem.prototype.GetEstimatedInvestment = function () {
        var investment = 0;
        switch (this.GetCategoryType()) {
            case CategoryType.Visibility:
            case CategoryType.Institutional:
            case CategoryType.Performance:
                var baseGMSum = this.GetBaseGMSum(this.GetCategoryType());
                investment = (baseGMSum > 0 ? (this.GetBaseGM() / baseGMSum) * (this.Investment || 0) : 0);
                break;
            case CategoryType.SpecialExhibitions:
                investment = this.Investment || 0;
                break;
            case CategoryType.ConsumerPromo:
                if (this.Type != null && this.Type.Name.toLowerCase() == "redemption")
                    investment = this.GetTotalEstimatedVolume() * (this.Redemption / 100) * this.DiscountPerPiece;
                else
                    investment = this.GetTotalEstimatedVolume() * this.DiscountPerPiece;
                break;
            default:
                investment = this.GetTotalEstimatedVolume() * this.DiscountPerPiece;
                break;
        }
        investment += this.AdditionalInvestment || 0;
        return investment;
    };
    PromoItem.prototype.GetIncrementalGM = function () {
        if (this.RequiresIncrementalGM()) {
            return (this.GetEstimatedGMPromo() || 0) - (this.GetBaseGM() || 0);
        }
        return null;
    };
    PromoItem.prototype.GetROI = function () {
        var value1 = (this.GetEstimatedGMPromo() || 0) - (this.GetBaseGM() || 0);
        //En la siguiente línea se excluye la inversión adicional MKT por estar ya incluída 
        //en la inversión estimada (lo cual fue un cambio)
        var value2 = (this.GetEstimatedInvestment() || 0); // + (this.AdditionalInvestment || 0);
        if (value2 > 0)
            return value1 / value2;
        return null;
    };
    PromoItem.prototype.IsEffective = function () {
        var roi = this.GetROI();
        return (roi != null && roi >= 1);
    };
    //#endregion
    //#region Numbers as strings
    PromoItem.prototype.GetInvestmentAsString = function () {
        return this.Investment != null ? this.Investment.toString() : "";
    };
    PromoItem.prototype.GetDiscountPerPieceAsString = function () {
        return this.DiscountPerPiece != null ? this.DiscountPerPiece.toString() : "";
    };
    PromoItem.prototype.GetNetPriceAsString = function () {
        return this.NetPrice != null ? this.NetPrice.toFixed(2) : "0.00";
    };
    PromoItem.prototype.GetDiscountPercentageAsString = function () {
        var discountPercentage = this.GetDiscountPercentage();
        return discountPercentage != null ? discountPercentage.toFixed(2) : "0.0";
    };
    PromoItem.prototype.GetBEPNRAsString = function () {
        var value = this.GetBEPNR();
        return value != null ? value.toFixed(2) : "0.00";
    };
    PromoItem.prototype.GetCOGSAsString = function () {
        return this.COGS != null ? this.COGS.toFixed(2) : "-";
    };
    PromoItem.prototype.GetGMPercentageNRAsString = function () {
        var gmPercentageNR = this.GetGMPercentageNR();
        return gmPercentageNR != null ? gmPercentageNR.toFixed(2) : "0.0";
    };
    PromoItem.prototype.GetGMPercentageNRWithPromoAsString = function () {
        var gmPercentageNRWithPromo = this.GetGMPercentageNRWithPromo();
        return gmPercentageNRWithPromo != null ? gmPercentageNRWithPromo.toFixed(2) : "0.0";
    };
    PromoItem.prototype.GetGMBaseUnitAsString = function () {
        var gmBaseUnit = this.GetGMBaseUnit();
        return gmBaseUnit != null ? gmBaseUnit.toFixed(2) : "0.0";
    };
    PromoItem.prototype.GetGMPromoUnitAsString = function () {
        var gmPromoUnit = this.GetGMPromoUnit();
        return gmPromoUnit != null ? gmPromoUnit.toFixed(2) : "0.0";
    };
    PromoItem.prototype.GetBEPGMAsString = function () {
        var value = this.GetBEPGM();
        return value != null ? value.toFixed(2) : "0.00";
    };
    PromoItem.prototype.GetLastYearVolumeAsString = function () {
        var value = this.GetLastYearVolume();
        return value != null ? value.toFixed(0) : null;
    };
    PromoItem.prototype.GetAverageVolumeL3MonthsAsString = function () {
        var value = this.GetAverageVolumeL3Months();
        return value != null ? value.toFixed(0) : null;
    };
    PromoItem.prototype.GetRedemptionAsString = function () {
        return this.Redemption != null ? this.Redemption.toString() : "";
    };
    PromoItem.prototype.GetBaseVolumeAsString = function () {
        return this.BaseVolume != null ? this.BaseVolume.toString() : "";
    };
    PromoItem.prototype.GetEstimatedIncrementalVolumeAsString = function () {
        return this.EstimatedIncrementalVolume != null ? this.EstimatedIncrementalVolume.toString() : "";
    };
    PromoItem.prototype.GetAdditionalInvestmentAsString = function () {
        return this.AdditionalInvestment != null ? this.AdditionalInvestment.toString() : "";
    };
    PromoItem.prototype.GetTotalEstimatedVolumeAsString = function () {
        var value = this.GetTotalEstimatedVolume();
        return value != null ? value.toFixed(0) : null;
    };
    PromoItem.prototype.GetIncrementalVolumePercentageAsString = function () {
        var value = this.GetIncrementalVolumePercentage();
        return value != null ? value.toFixed(2) : null;
    };
    PromoItem.prototype.GetBaseNRAsString = function () {
        var value = this.GetBaseNR();
        return value != null ? value.toLocaleString() : null;
    };
    PromoItem.prototype.GetEstimatedNRAsString = function () {
        var value = this.GetEstimatedNR();
        return value != null ? value.toLocaleString() : null;
    };
    PromoItem.prototype.GetIncrementalEstimatedNRAsString = function () {
        var value = this.GetIncrementalEstimatedNR();
        return value != null ? value.toLocaleString() : null;
    };
    PromoItem.prototype.GetBaseGMAsString = function () {
        var value = this.GetBaseGM();
        return value != null ? value.toLocaleString() : null;
    };
    PromoItem.prototype.GetEstimatedGMPromoAsString = function () {
        var value = this.GetEstimatedGMPromo();
        return value != null ? value.toLocaleString() : null;
    };
    PromoItem.prototype.GetIncrementalGMAsString = function () {
        var value = this.GetIncrementalGM();
        return value != null ? value.toLocaleString() : null;
    };
    PromoItem.prototype.GetEstimatedInvestmentAsString = function () {
        var value = this.GetEstimatedInvestment().toLocaleString();
        return value != null ? value.toLocaleString() : null;
    };
    PromoItem.prototype.GetROIAsString = function () {
        var value = this.GetROI();
        return value != null ? value.toFixed(2) : "0.00";
    };
    //#endregion
    PromoItem.prototype.IsValid = function () {
        var invalidCount = 0;
        if (CommonHelper.IsNullOrEmpty(this.ShortDescription))
            invalidCount++;
        if (this.Category == null)
            invalidCount++;
        if (this.RequiresInvestment() && !(this.Investment > 0))
            invalidCount++;
        if (this.Type == null)
            invalidCount++;
        if (this.BusinessUnit == null)
            invalidCount++;
        if (this.Brand == null)
            invalidCount++;
        //if (this.Product == null) invalidCount++;
        if (this.ClientProduct == null)
            invalidCount++;
        if (this.ProductCategory == null)
            invalidCount++;
        //if (this.Client == null) invalidCount++;
        if (!CommonHelper.IsDate(this.StartDate))
            invalidCount++;
        if (!CommonHelper.IsDate(this.EndDate))
            invalidCount++;
        if (this.RequiresDiscountPerPiece() && !(this.DiscountPerPiece > 0))
            invalidCount++;
        if (this.RequiresRedemption() && !(this.Redemption > 0))
            invalidCount++;
        if (!(this.BaseVolume > 0))
            invalidCount++;
        if (!(this.EstimatedIncrementalVolume > 0))
            invalidCount++;
        return invalidCount == 0;
    };
    return PromoItem;
}(Entity));
export { PromoItem };
//# sourceMappingURL=PromoItem.js.map