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
import * as React from 'react';
import { DatePicker, DayOfWeek, Label } from "office-ui-fabric-react";
import { Constants } from '../../Constants';
import { CommonHelper } from '../../common/CommonHelper';
var RBDatePicker = /** @class */ (function (_super) {
    __extends(RBDatePicker, _super);
    function RBDatePicker(props) {
        return _super.call(this, props) || this;
    }
    RBDatePicker.prototype.render = function () {
        return (React.createElement("div", { className: CommonHelper.IsNullOrEmpty(this.props.errorMessage) ? "" : "datePickerError" },
            React.createElement(Label, { required: this.props.required }, this.props.label),
            React.createElement(DatePicker, { firstDayOfWeek: DayOfWeek.Monday, strings: Constants.Miscellaneous.DayPickerStrings, placeholder: "Seleccione una fecha...", ariaLabel: "Seleccione una fecha", value: this.props.value, onSelectDate: this.onSelectDate.bind(this), formatDate: CommonHelper.formatDate, minDate: this.props.minDate, maxDate: this.props.maxDate }),
            React.createElement("div", { hidden: CommonHelper.IsNullOrEmpty(this.props.errorMessage), role: "alert", className: "errorMessage" }, this.props.errorMessage)));
    };
    RBDatePicker.prototype.onSelectDate = function (date) {
        this.props.onSelectDate(date);
    };
    return RBDatePicker;
}(React.Component));
export { RBDatePicker };
//# sourceMappingURL=RBDatePicker.js.map