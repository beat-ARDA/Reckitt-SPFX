import { sp } from '@pnp/sp';
import '../GlobalVariables';
var CommonHelper = /** @class */ (function () {
    function CommonHelper() {
    }
    CommonHelper.IsNullOrEmpty = function (value) {
        return value == null || value == "";
    };
    CommonHelper.IsArray = function (v) {
        return v.length != undefined;
    };
    CommonHelper.IsDate = function (v) {
        return v != null && typeof v.getDate === "function";
    };
    CommonHelper.getParameterByName = function (name, url) {
        if (url === void 0) { url = window.location.href; }
        name = name.replace(/[\[\]]/g, '\\$&').toLocaleLowerCase();
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url.toLocaleLowerCase());
        if (!results)
            return null;
        if (!results[2])
            return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };
    CommonHelper.formatDate = function (date) {
        return !date ? '' : ("0" + date.getDate()).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + (date.getFullYear());
    };
    CommonHelper.replaceAll = function (str, searchValue, replaceValue) {
        var regex = new RegExp(searchValue, 'g');
        return str.replace(regex, replaceValue);
    };
    CommonHelper.ensurePnPJs = function (context) {
        if (!_spInitialized) {
            /*sp.setup({
                spfxContext: context
            });*/
            sp.setup({
                sp: {
                    headers: {
                        Accept: "application/json;odata=verbose",
                    },
                    baseUrl: context.pageContext.web.absoluteUrl
                },
            });
            _spInitialized = true;
        }
    };
    CommonHelper.getDecimal = function (value, decimals) {
        var retVal = null;
        if (value || value === 0) {
            if (!isNaN(parseFloat(value))) {
                retVal = parseFloat(parseFloat(value).toFixed(decimals));
            }
        }
        return retVal;
    };
    CommonHelper.isValidDecimal = function (value, decimals) {
        var re = new RegExp('^\\d+(\\.\\d{0,' + decimals + '})?$');
        var retVal = re.test(value);
        return retVal;
    };
    CommonHelper.EmptyString = "";
    return CommonHelper;
}());
export { CommonHelper };
//# sourceMappingURL=CommonHelper.js.map