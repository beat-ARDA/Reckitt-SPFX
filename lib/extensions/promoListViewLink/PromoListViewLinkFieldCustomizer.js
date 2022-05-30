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
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { override } from '@microsoft/decorators';
import { BaseFieldCustomizer } from '@microsoft/sp-listview-extensibility';
import PromoListViewLink from './components/PromoListViewLink';
import { CommonHelper } from '../../core/common';
var LOG_SOURCE = 'PromoListViewLinkFieldCustomizer';
var PromoListViewLinkFieldCustomizer = /** @class */ (function (_super) {
    __extends(PromoListViewLinkFieldCustomizer, _super);
    function PromoListViewLinkFieldCustomizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PromoListViewLinkFieldCustomizer.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            CommonHelper.ensurePnPJs(_this.context);
        });
    };
    PromoListViewLinkFieldCustomizer.prototype.onRenderCell = function (event) {
        var promoListViewLink = React.createElement(PromoListViewLink, {
            context: this.context,
            itemId: event.listItem.getValueByName("ID"),
            title: event.listItem.getValueByName("Title")
        });
        ReactDOM.render(promoListViewLink, event.domElement);
    };
    PromoListViewLinkFieldCustomizer.prototype.onDisposeCell = function (event) {
        // This method should be used to free any resources that were allocated during rendering.
        // For example, if your onRenderCell() called ReactDOM.render(), then you should
        // call ReactDOM.unmountComponentAtNode() here.
        ReactDOM.unmountComponentAtNode(event.domElement);
        _super.prototype.onDisposeCell.call(this, event);
    };
    __decorate([
        override
    ], PromoListViewLinkFieldCustomizer.prototype, "onInit", null);
    __decorate([
        override
    ], PromoListViewLinkFieldCustomizer.prototype, "onRenderCell", null);
    __decorate([
        override
    ], PromoListViewLinkFieldCustomizer.prototype, "onDisposeCell", null);
    return PromoListViewLinkFieldCustomizer;
}(BaseFieldCustomizer));
export default PromoListViewLinkFieldCustomizer;
//# sourceMappingURL=PromoListViewLinkFieldCustomizer.js.map