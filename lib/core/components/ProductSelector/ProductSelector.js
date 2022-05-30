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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import Select from 'react-select';
import { Label } from "office-ui-fabric-react";
import { CommonHelper } from '../../common/CommonHelper';
var ProductSelector = /** @class */ (function (_super) {
    __extends(ProductSelector, _super);
    function ProductSelector(props) {
        return _super.call(this, props) || this;
    }
    ProductSelector.prototype.render = function () {
        var _this = this;
        var options = this.props.clientProducts != null ?
            this.props.clientProducts.map(function (item) {
                return { value: item.ItemId, label: item.SKUNumber + " - " + item.SKUDescription };
            }) : [];
        var value = this.props.value ? options.filter(function (x) { return x.value === _this.props.value.ItemId; })[0] : null;
        var selectStyles = {
            control: function (styles) { return (__assign({}, styles, { borderColor: (CommonHelper.IsNullOrEmpty(_this.props.errorMessage) ? "rgb(96, 94, 92)" : "rgb(164, 38, 44)") + " !important", minHeight: "32px", boxShadow: "0" })); },
            valueContainer: function (styles) { return (__assign({}, styles, { padding: "0px 8px" })); },
            indicatorSeparator: function (styles) { return (__assign({}, styles, { display: "none" })); },
            dropdownIndicator: function (styles) { return (__assign({}, styles, { padding: "2px 8px", color: "hsl(0,0%,80%) !important" })); },
            menu: function (styles) { return (__assign({}, styles, { marginTop: "0" })); },
            menuList: function (styles) { return (__assign({}, styles, { paddingTop: "0" })); },
            option: function (styles) { return (__assign({}, styles, { color: "inherit" })); },
        };
        var selectTheme = function (theme) { return (__assign({}, theme, { borderRadius: 0, colors: __assign({}, theme.colors, { primary25: "rgb(243, 242, 241)", primary: "rgb(225, 223, 221)", primary50: "rgb(243, 242, 241)" }) })); };
        return (React.createElement("div", null,
            React.createElement(Label, { required: this.props.required }, "SKU: "),
            React.createElement(Select, { options: options, theme: selectTheme, styles: selectStyles, onChange: this.onChange.bind(this), value: value }),
            React.createElement("div", { hidden: CommonHelper.IsNullOrEmpty(this.props.errorMessage), role: "alert", className: "errorMessage" }, this.props.errorMessage)));
    };
    ProductSelector.prototype.onChange = function (item, action) {
        this.props.onChanged(item.value);
    };
    return ProductSelector;
}(React.Component));
export { ProductSelector };
//# sourceMappingURL=ProductSelector.js.map