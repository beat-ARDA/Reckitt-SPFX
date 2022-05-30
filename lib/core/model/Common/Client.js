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
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client(init) {
        var _this = _super.call(this) || this;
        Object.assign(_this, init);
        return _this;
    }
    return Client;
}(Entity));
export { Client };
//# sourceMappingURL=Client.js.map