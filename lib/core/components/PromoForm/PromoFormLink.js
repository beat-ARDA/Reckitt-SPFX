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
import * as React from "react";
import { PromoFormDialog } from '.';
import { Stack, getTheme, PrimaryButton } from "office-ui-fabric-react";
import { CommonHelper } from "../../common/CommonHelper";
import { initializeTheme } from './Theme';
import { SecurityHelper } from "../../common";
import { ClientRepository, ConfigurationRepository } from "../../data";
initializeTheme();
var theme = getTheme();
var PromoFormLink = /** @class */ (function (_super) {
    __extends(PromoFormLink, _super);
    function PromoFormLink(props) {
        var _this = _super.call(this, props) || this;
        _this.banner = require('../../../assets/images/banner.png');
        _this.mainStakStyles = {
            backgroundImage: "url(" + _this.banner + ")",
            padding: "16px",
            height: "240px",
            backgroundSize: 'cover'
        };
        _this.headerStyles = {
            font: "normal normal 600 32px/48px Segoe UI",
            color: "#FFFFFF",
        };
        _this.subHeaderStyles = {
            font: "normal normal normal 18px/24px Segoe UI",
            color: "#FFFFFF",
        };
        _this.openPromotionButtonStyles = {
            width: "180px",
            backgroundColor: "#425C68",
            border: "transparent"
        };
        _this.state = {
            showButton: false
        };
        return _this;
    }
    PromoFormLink.prototype.componentDidMount = function () {
        var _this = this;
        var itemId = CommonHelper.getParameterByName("ItemId");
        if (itemId != null)
            this.openPromoFormDialog();
        ConfigurationRepository.GetInstance().then(function (config) {
            SecurityHelper.GetCurrentUser().then(function (user) {
                SecurityHelper.UserIsMemberOfGroup(user.ItemId, config.KAMsGroupName).then(function (isMember) {
                    if (isMember) {
                        ClientRepository.UserIsKAM(user.ItemId).then(function (isKAM) {
                            _this.setState({ showButton: isKAM });
                        });
                    }
                });
            });
        });
    };
    PromoFormLink.prototype.render = function () {
        var _this = this;
        var output = React.createElement(Stack, { style: this.mainStakStyles },
            React.createElement(Stack, { verticalFill: true, verticalAlign: "start" },
                React.createElement("span", { style: this.headerStyles }, "TPM \u2013 Trade Promotions Management"),
                React.createElement("span", { style: this.subHeaderStyles }, "LATAM")),
            React.createElement(Stack, { verticalAlign: "end", horizontal: true },
                React.createElement("div", { hidden: !this.state.showButton },
                    React.createElement(PrimaryButton, { onClick: function () { return _this.openPromoFormDialog(); }, style: this.openPromotionButtonStyles, text: "Nueva promoci\u00F3n", title: "Nueva promoci\u00F3n" }))));
        return output;
    };
    PromoFormLink.prototype.openPromoFormDialog = function () {
        var itemId = CommonHelper.getParameterByName("ItemId");
        var dialog = new PromoFormDialog(!isNaN(parseFloat(itemId)) ? parseFloat(itemId) : null);
        //dialog.title = "Nueva promoción";
        dialog.context = this.props.context;
        dialog.show();
    };
    return PromoFormLink;
}(React.Component));
export { PromoFormLink };
//# sourceMappingURL=PromoFormLink.js.map