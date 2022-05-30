var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { sp } from "@pnp/sp/presets/all";
import { PromoEvidence } from "../model/Promo/PromoEvidence";
var EvidenceRepository = /** @class */ (function () {
    function EvidenceRepository() {
    }
    EvidenceRepository.UpdateEvidence = function (promoID, evidence) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(evidence.map(function (promoEvidence) { return __awaiter(_this, void 0, void 0, function () {
                            var file, webData, docLibUrl, folderUrl, fileAddResult, folderExists, item;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        file = promoEvidence.File;
                                        return [4 /*yield*/, sp.web.select("ServerRelativeUrl")()];
                                    case 1:
                                        webData = _a.sent();
                                        docLibUrl = webData.ServerRelativeUrl + "/Evidence/";
                                        folderUrl = docLibUrl + promoID;
                                        if (!promoEvidence.File) return [3 /*break*/, 11];
                                        fileAddResult = void 0;
                                        return [4 /*yield*/, sp.web.getFolderByServerRelativeUrl(docLibUrl).folders.getByName(promoID)
                                                .select('Exists').get()
                                                .then(function (d) { return d.Exists; })
                                                .catch(function () { return false; })];
                                    case 2:
                                        folderExists = _a.sent();
                                        if (!!folderExists) return [3 /*break*/, 4];
                                        return [4 /*yield*/, sp.web.getFolderByServerRelativeUrl(docLibUrl).folders.add(promoID)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4:
                                        if (!(promoEvidence.File.size <= 10485760)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, sp.web.getFolderByServerRelativeUrl(folderUrl).files.add(file.name, file, true)];
                                    case 5:
                                        //small upload
                                        fileAddResult = _a.sent();
                                        return [3 /*break*/, 8];
                                    case 6: return [4 /*yield*/, sp.web.getFolderByServerRelativeUrl(folderUrl).files.addChunked(file.name, file, function (data) { }, true)];
                                    case 7:
                                        //large upload
                                        fileAddResult = _a.sent();
                                        _a.label = 8;
                                    case 8: return [4 /*yield*/, fileAddResult.file.getItem()];
                                    case 9:
                                        item = _a.sent();
                                        return [4 /*yield*/, item.update({
                                                EvidenceDescription: promoEvidence.Description,
                                                EvidenceDate: promoEvidence.Date
                                            })];
                                    case 10:
                                        _a.sent();
                                        return [3 /*break*/, 13];
                                    case 11:
                                        if (!promoEvidence.Deleted) return [3 /*break*/, 13];
                                        return [4 /*yield*/, sp.web.getFolderByServerRelativeUrl(folderUrl).files.getByName(promoEvidence.FileName).delete()];
                                    case 12:
                                        _a.sent();
                                        _a.label = 13;
                                    case 13: return [2 /*return*/];
                                }
                            });
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EvidenceRepository.GetByPromoID = function (promoID) {
        return __awaiter(this, void 0, void 0, function () {
            var promoEvidence, webData, docLibUrl, folderUrl, folderExists, files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promoEvidence = [];
                        return [4 /*yield*/, sp.web.select("ServerRelativeUrl")()];
                    case 1:
                        webData = _a.sent();
                        docLibUrl = webData.ServerRelativeUrl + "/Evidence/";
                        folderUrl = docLibUrl + promoID;
                        return [4 /*yield*/, sp.web.getFolderByServerRelativeUrl(folderUrl)
                                .select('Exists').get()
                                .then(function (d) { return d.Exists; })
                                .catch(function () { return false; })];
                    case 2:
                        folderExists = _a.sent();
                        if (!folderExists) return [3 /*break*/, 4];
                        return [4 /*yield*/, sp.web.getFolderByServerRelativeUrl(folderUrl).files()];
                    case 3:
                        files = _a.sent();
                        Promise.all(files.map(function (file) { return __awaiter(_this, void 0, void 0, function () {
                            var item, evidence;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, sp.web.getFileByServerRelativePath(file.ServerRelativeUrl).getItem()];
                                    case 1:
                                        item = _a.sent();
                                        evidence = new PromoEvidence();
                                        evidence.FileName = file.Name;
                                        evidence.FileUrl = file.ServerRelativeUrl;
                                        evidence.Description = item.EvidenceDescription;
                                        evidence.Date = item.EvidenceDate ? new Date(item.EvidenceDate) : null;
                                        promoEvidence.push(evidence);
                                        return [2 /*return*/];
                                }
                            });
                        }); }));
                        _a.label = 4;
                    case 4: return [2 /*return*/, promoEvidence];
                }
            });
        });
    };
    return EvidenceRepository;
}());
export { EvidenceRepository };
//# sourceMappingURL=EvidenceRepository.js.map