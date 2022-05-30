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
import { DialogContent } from 'office-ui-fabric-react';
import styles from './PromoForm.module.scss';
var PromoFormResult = /** @class */ (function (_super) {
    __extends(PromoFormResult, _super);
    function PromoFormResult(props) {
        return _super.call(this, props) || this;
    }
    PromoFormResult.prototype.render = function () {
        var containerClass = this.props.isSuccess ? styles.successMessageContainer : styles.errorMessageContainer;
        var fontClass = this.props.isSuccess ? "ms-fontColor-neutralPrimary" : "ms-fontColor-red";
        return (React.createElement(DialogContent, { title: this.props.title, showCloseButton: true, onDismiss: this.props.close, className: styles.promoForm },
            React.createElement("div", { className: containerClass },
                React.createElement("span", { style: { fontStyle: 'italic' }, className: ["ms-font-xl", fontClass].join(" ") }, this.props.message))));
    };
    PromoFormResult.prototype.componentDidMount = function () {
        this.timeoutClose();
    };
    PromoFormResult.prototype.timeoutClose = function () {
        var timeoutSec = this.props.successMessageTimeout || 5;
        if (this.props.isSuccess) {
            setTimeout(this.props.close, timeoutSec * 1000);
        }
    };
    return PromoFormResult;
}(React.Component));
export { PromoFormResult };
//# sourceMappingURL=PromoFormResult.js.map