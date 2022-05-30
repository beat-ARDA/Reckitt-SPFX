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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import styles from './PromoListViewLink.module.scss';
import { PromoFormDialog } from '../../../core/components/PromoForm';
var LOG_SOURCE = 'PromoListViewLink';
var PromoListViewLink = /** @class */ (function (_super) {
    __extends(PromoListViewLink, _super);
    function PromoListViewLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PromoListViewLink.prototype.componentDidMount = function () {
        Log.info(LOG_SOURCE, 'React Element: PromoListViewLink mounted');
    };
    PromoListViewLink.prototype.componentWillUnmount = function () {
        Log.info(LOG_SOURCE, 'React Element: PromoListViewLink unmounted');
    };
    PromoListViewLink.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.cell },
            React.createElement("a", { className: "ms-Link", onClick: function () { return _this.openPromoFormDialog(); } },
                React.createElement("span", { className: styles.link }, this.props.title))));
    };
    PromoListViewLink.prototype.openPromoFormDialog = function () {
        var dialog = new PromoFormDialog(this.props.itemId);
        dialog.context = this.props.context;
        dialog.show();
    };
    __decorate([
        override
    ], PromoListViewLink.prototype, "componentDidMount", null);
    __decorate([
        override
    ], PromoListViewLink.prototype, "componentWillUnmount", null);
    __decorate([
        override
    ], PromoListViewLink.prototype, "render", null);
    return PromoListViewLink;
}(React.Component));
export default PromoListViewLink;
//# sourceMappingURL=PromoListViewLink.js.map