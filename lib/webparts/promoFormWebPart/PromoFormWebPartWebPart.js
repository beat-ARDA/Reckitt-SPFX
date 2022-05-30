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
import { override } from '@microsoft/decorators';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'PromoFormWebPartWebPartStrings';
import { PromoFormLink } from '../../core/components/PromoForm';
import { CommonHelper } from '../../core/common';
var PromoFormWebPartWebPart = /** @class */ (function (_super) {
    __extends(PromoFormWebPartWebPart, _super);
    function PromoFormWebPartWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PromoFormWebPartWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            CommonHelper.ensurePnPJs(_this.context);
        });
    };
    PromoFormWebPartWebPart.prototype.render = function () {
        var element = React.createElement(PromoFormLink, {
            context: this.context
        });
        ReactDom.render(element, this.domElement);
    };
    PromoFormWebPartWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    PromoFormWebPartWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    __decorate([
        override
    ], PromoFormWebPartWebPart.prototype, "onInit", null);
    return PromoFormWebPartWebPart;
}(BaseClientSideWebPart));
export default PromoFormWebPartWebPart;
//# sourceMappingURL=PromoFormWebPartWebPart.js.map