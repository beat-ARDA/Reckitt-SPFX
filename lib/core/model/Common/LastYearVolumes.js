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
var LastYearVolumes = /** @class */ (function (_super) {
    __extends(LastYearVolumes, _super);
    function LastYearVolumes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.Volumes = [];
        return _this;
    }
    LastYearVolumes.prototype.GetDailyVolume = function (year, month) {
        return this.Volumes[month] / (new Date(year, month, 0).getDate());
    };
    LastYearVolumes.prototype.GetAverageVolumeL3Months = function (referenceMonth) {
        var volume = 0;
        for (var i = 1; i < 4; i++) {
            var index = referenceMonth >= i ? referenceMonth - i : referenceMonth - i + 12;
            volume += this.Volumes[index];
        }
        return volume / 3;
    };
    return LastYearVolumes;
}(Entity));
export { LastYearVolumes };
//# sourceMappingURL=LastYearVolumes.js.map