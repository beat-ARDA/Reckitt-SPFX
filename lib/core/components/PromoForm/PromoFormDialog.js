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
import * as ReactDOM from 'react-dom';
import { BaseDialog } from '@microsoft/sp-dialog';
import { PromoForm } from './PromoForm';
var PromoFormDialog = /** @class */ (function (_super) {
    __extends(PromoFormDialog, _super);
    function PromoFormDialog(itemId) {
        var _this = _super.call(this, { isBlocking: true }) || this;
        _this.itemId = itemId;
        return _this;
    }
    PromoFormDialog.prototype.onAfterClose = function () {
        _super.prototype.onAfterClose.call(this);
        // Clean up the element for the next dialog
        ReactDOM.unmountComponentAtNode(this.domElement);
    };
    PromoFormDialog.prototype.render = function () {
        ReactDOM.render(React.createElement("div", null,
            React.createElement(PromoForm, { itemId: this.itemId, title: this.title, close: this.close, submit: this.submit, context: this.context })), this.domElement);
    };
    PromoFormDialog.prototype.submit = function () {
        this.close();
    };
    return PromoFormDialog;
}(BaseDialog));
export { PromoFormDialog };
//# sourceMappingURL=PromoFormDialog.js.map