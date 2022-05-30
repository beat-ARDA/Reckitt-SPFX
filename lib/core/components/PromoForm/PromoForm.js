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
import * as React from 'react';
import { PromoFormResult } from '.';
import { PromoService } from '../../services/PromoService';
import { PrimaryButton, DefaultButton, TextField, DialogContent, Shimmer, DialogFooter, Dropdown, Toggle, Label, Modal, IconButton, Dialog, Stack, Persona, PersonaSize, Link, Icon, mergeStyles, getTheme, FontWeights, mergeStyleSets, Spinner, DialogType } from 'office-ui-fabric-react';
import styles from './PromoForm.module.scss';
import { Client } from '../../model/Common';
import { ClientRepository } from '../../data';
import { PromoItem, PromoStatus } from '../../model/Promo';
import { Constants } from '../../Constants';
import { ActionConfirmationType, LookupValue } from '../../infrastructure';
import { ProductSelector } from '../ProductSelector/ProductSelector';
import { CommonHelper } from '../../common/CommonHelper';
import { ClientProductRepository } from '../../data/ClientProductRepository';
import { Pivot, PivotItem } from '@fluentui/react-tabs';
require('../PromoForm/PromoForm.overrides.scss');
require('./PromoForm.css');
import { initializeTheme } from './Theme';
import { LastYearVolumesRepository } from '../../data/LastYearVolumesRepository';
import { RBDatePicker } from '../RBDatePicker/RBDatePicker';
import { PromoEvidence } from '../../model/Promo/PromoEvidence';
import { SecurityHelper } from '../../common/SecurityHelper';
import { ApproversRepository } from '../../data/ApproversRepository';
initializeTheme();
var theme = getTheme();
var PromoForm = /** @class */ (function (_super) {
    __extends(PromoForm, _super);
    function PromoForm(props) {
        var _this = _super.call(this, props) || this;
        _this._getShimmerStyles = function (_props) {
            return {
                shimmerWrapper: [
                    {
                        backgroundColor: '#deecf9',
                        backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #c7e0f4 50%, rgba(255, 255, 255, 0) 100%)'
                    }
                ]
            };
        };
        // New part
        _this.contentStyles = mergeStyleSets({
            header: [
                // eslint-disable-next-line deprecation/deprecation
                theme.fonts.xLargePlus,
                {
                    flex: '1 1 auto',
                    borderTop: "4px solid " + theme.palette.themePrimary,
                    color: theme.palette.neutralPrimary,
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: FontWeights.semibold,
                    padding: '12px 12px 14px 24px',
                },
            ]
        });
        _this.cancelIcon = { iconName: 'Cancel' };
        _this.iconButtonStyles = {
            root: {
                color: theme.palette.neutralPrimary,
                marginLeft: 'auto',
                marginTop: '4px',
                marginRight: '2px',
            },
            rootHovered: {
                color: theme.palette.neutralDark,
            },
        };
        _this.repetitiveSectionStyle = {
            root: {
                minHeight: 320,
            },
        };
        _this.confirmationDialogStyles = { main: { maxWidth: '450px' } };
        _this.wrapperClass = mergeStyles({
            padding: 2,
            selectors: {
                '& > .ms-Shimmer-container': {
                    margin: '10px 0',
                },
            },
        });
        _this.getCustomShimmerElementsGroup = function () {
            return (React.createElement("div", { style: { display: 'flex' }, className: _this.wrapperClass }));
        };
        _this.deleteProductDialogContentProps = {
            type: DialogType.normal,
            title: 'Eliminar producto',
            closeButtonAriaLabel: 'Cerrar',
            subText: 'Esta seguro que desea eliminar este producto de la promoción?',
        };
        _this.deleteEvidenceDialogContentProps = {
            type: DialogType.normal,
            title: 'Eliminar evidencia',
            closeButtonAriaLabel: 'Cerrar',
            subText: 'Esta seguro que desea eliminar esta evidencia de la promoción?',
        };
        _this.fileExistsDialogContentProps = {
            type: DialogType.normal,
            title: 'Archivo existente',
            closeButtonAriaLabel: 'Cerrar',
            subText: 'Ya existe una archivo con este nombre.'
        };
        _this.closeModalDialogContentProps = {
            type: DialogType.normal,
            title: 'Salir sin guardar',
            closeButtonAriaLabel: 'Cerrar',
            subText: 'Esta seguro que desea cerrar el formulario sin guardar?',
        };
        _this.savingSpinnerModalDialogContentProps = {
            type: DialogType.largeHeader,
        };
        _this.state = {
            isLoading: true,
            hasValidationError: false,
            enableSubmit: false,
            formSubmitted: false,
            resultIsOK: false,
            selectedIndex: 0,
            loadingTypes: false,
            filteredProducts: [],
            mainModalOpen: true,
            hideDeleteProductDialog: true,
            hideDeleteEvidenceDialog: true,
            errorMessage: "",
            hideModalConfirmationDialog: true,
            promotionTitle: "",
            hideSavingSpinnerConfirmationDialog: true,
            hideActionConfirmationDialog: true,
            enableActionValidation: false,
            hideFileExistsMessageDialog: true,
            copiarPromo: false,
            currentUser: "",
            promoProven: false,
            flowApproval: false
        };
        return _this;
    }
    PromoForm.prototype.GetUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, SecurityHelper.GetCurrentUser()];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            this.setState({
                                currentUser: user.Value
                            });
                        }
                        else {
                            this.setState({
                                currentUser: ""
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PromoForm.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var approvers;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ApproversRepository.GetInstance()];
                    case 1:
                        approvers = _a.sent();
                        this.GetUser();
                        PromoService.GetViewModel(this.props.itemId).then(function (viewModel) {
                            _this.setState({
                                isLoading: false,
                                enableSubmit: true,
                                viewModel: viewModel
                            });
                            console.log(viewModel.FlowsTypes);
                            _this.setState(function (state, props) { return ({
                                copiarPromo: viewModel.Entity.Client && _this.state.currentUser
                                    ? (viewModel.Entity.Client.KeyAccountManager.Value == _this.state.currentUser ? true : false) : false,
                                promoProven: _this.state.viewModel.Entity.GetStatusId() == PromoStatus.Approved
                                    ? (approvers.Phase0Coordinator1.Value == _this.state.currentUser || approvers.Phase0Coordinator2.Value == _this.state.currentUser
                                        || approvers.Phase0Coordinator3.Value == _this.state.currentUser ? true : false) : false,
                                flowApproval: viewModel.Entity.TipoFlujo == "" ? true : false
                            }); });
                        }).catch(function (err) {
                            console.error(err);
                            _this.setState({ formSubmitted: true, isLoading: false, errorMessage: err });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PromoForm.prototype.render = function () {
        var _this = this;
        var entity = this.state.viewModel ? this.state.viewModel.Entity : null;
        var client = entity ? entity.Client : null;
        var channel = client ? client.Channel : null;
        var headOfChannel = channel ? channel.HeadOfChannel : null;
        var kam = client ? client.KeyAccountManager : null;
        var subchannel = client ? client.Subchannel : null;
        var selectedItem = entity ? entity.Items[this.state.selectedIndex] : null;
        var readOnlyForm = this.state.viewModel ? this.state.viewModel.ReadOnlyForm : true;
        var output = React.createElement(DialogContent, { title: this.props.title, subText: "Cargando formulario...", onDismiss: this.props.close, showCloseButton: true },
            React.createElement("div", { className: styles.promoForm },
                React.createElement(Shimmer, { width: "100%", styles: this._getShimmerStyles })));
        if (!this.state.isLoading && !this.state.formSubmitted) {
            var clients = this.state.viewModel.Clients != null ?
                this.state.viewModel.Clients.map(function (item) {
                    return { key: item.ItemId, text: item.Name };
                }) : [];
            var categories = this.state.viewModel.Categories != null ?
                this.state.viewModel.Categories.map(function (item) {
                    return { key: item.ItemId, text: item.Name };
                }) : [];
            var types = this.state.viewModel.Types != null ?
                this.state.viewModel.Types.map(function (item) {
                    return { key: item.ItemId, text: item.Name };
                }) : [];
            var businessUnits = this.GetFilteredBUs() != null ?
                this.GetFilteredBUs().map(function (item) {
                    return { key: item.ItemId, text: item.Value };
                }) : [];
            var brands = this.GetFilteredBrands() != null ?
                this.GetFilteredBrands().map(function (item) {
                    return { key: item.ItemId, text: item.Value };
                }) : [];
            var productCategories = this.GetFilteredProductCategories() != null ?
                this.GetFilteredProductCategories().map(function (item) {
                    return { key: item.ItemId, text: item.Value };
                }) : [];
            //#endregion
            output =
                React.createElement("div", null,
                    React.createElement(Modal, { isOpen: this.state.mainModalOpen, className: "mainModal" },
                        React.createElement(Shimmer, { width: "100%", styles: this._getShimmerStyles, customElementsGroup: this.getCustomShimmerElementsGroup(), isDataLoaded: !this.state.isLoading, onClick: function () { return _this.setState({ isLoading: false }); } },
                            React.createElement("div", { className: this.contentStyles.header },
                                React.createElement("span", null, this.state.viewModel.GetPromotionTitle()),
                                React.createElement(IconButton, { styles: this.iconButtonStyles, iconProps: this.cancelIcon, ariaLabel: "Close popup modal", onClick: this.onCloseModal.bind(this), autoFocus: false })),
                            React.createElement(Dialog, { hidden: this.state.hideModalConfirmationDialog, dialogContentProps: this.closeModalDialogContentProps, styles: this.confirmationDialogStyles, onDismiss: function () { return _this.setState({ hideModalConfirmationDialog: true }); } },
                                React.createElement(DialogFooter, null,
                                    React.createElement(DefaultButton, { onClick: function () { return _this.setState({ hideModalConfirmationDialog: true }); }, text: "Cancelar" }),
                                    React.createElement(PrimaryButton, { onClick: this.props.close, text: "Salir sin guardar", style: {
                                            backgroundColor: "#425C68",
                                            border: "transparent"
                                        } }))),
                            React.createElement(Stack, { className: "mainPadding" },
                                React.createElement(Pivot, { "aria-label": "Main Pivot", className: "mainPivot", overflowBehavior: "menu" },
                                    React.createElement(PivotItem, { onRenderItemLink: this._customPromotionPivotItemRenderer.bind(this, entity.PromoID) },
                                        React.createElement(Stack, { styles: this.repetitiveSectionStyle },
                                            React.createElement(Stack, { className: "statusContainer smallPadding padding-right", horizontal: true, horizontalAlign: "end" },
                                                React.createElement(PrimaryButton, { text: "Comprobar", style: {
                                                        marginRight: "15px", display: this.state.promoProven ? "block" : "none",
                                                        backgroundColor: "#425C68",
                                                        border: "transparent"
                                                    }, allowDisabledFocus: true, onClick: this.Proven.bind(this) }),
                                                React.createElement(PrimaryButton, { text: "Copiar promocion", style: {
                                                        display: this.state.copiarPromo ? "block" : "none",
                                                        backgroundColor: "#425C68",
                                                        border: "transparent"
                                                    }, allowDisabledFocus: true, onClick: this.copyPromo.bind(this) }),
                                                React.createElement(Stack, { style: { color: theme.palette.themePrimary, paddingRight: "4px" } },
                                                    React.createElement(Icon, { iconName: "MapLayers" })),
                                                React.createElement(Stack, { className: "label" }, "Estado:"),
                                                React.createElement(Stack, { style: { color: theme.palette.themePrimary, fontWeight: "bold" } }, entity.GetStatusText())),
                                            React.createElement(Stack, { horizontal: true, className: "padding" },
                                                React.createElement(Stack, { grow: 8, verticalAlign: "start", className: "fixedStructure" },
                                                    React.createElement(Stack, { grow: 12, horizontal: true, className: "smallPadding" },
                                                        React.createElement(Stack, { grow: 6, className: "padding-right controlPadding fixedStructure" },
                                                            React.createElement(TextField, { label: "Nombre de la promoci\u00F3n", value: entity.Name, placeholder: "Ingrese el nombre de la promoci\u00F3n", required: !readOnlyForm, errorMessage: this.getValidationErrorMessage(entity.Name), autoFocus: true, onChange: this.onNameChange.bind(this), autoComplete: "Off", readOnly: readOnlyForm, maxLength: 100 })),
                                                        React.createElement(Stack, { grow: 6, className: "padding-right controlPadding fixedStructure" }, !readOnlyForm ?
                                                            React.createElement(Dropdown, { placeholder: "Seleccione un cliente", label: "Cliente:", options: clients, selectedKey: entity.Client ? entity.Client.ItemId : null, onChanged: this.onClientChanged.bind(this), required: true, errorMessage: this.getValidationErrorMessage(entity.Client) }) :
                                                            React.createElement(TextField, { label: "Cliente", value: entity.Client ? entity.Client.Name : "", readOnly: true }))),
                                                    React.createElement(Stack, { grow: 12, className: "padding-right multilineControlPadding" },
                                                        React.createElement(TextField, { label: "Objetivo de la actividad:", required: !readOnlyForm, multiline: true, rows: 3, onChange: this.onActivityObjectiveChange.bind(this), value: entity.ActivityObjective, autoComplete: "Off", errorMessage: this.getValidationErrorMessage(entity.ActivityObjective), readOnly: readOnlyForm, maxLength: 500 }))),
                                                React.createElement(Stack, { grow: 4, horizontal: true, className: "fixedStructure" },
                                                    React.createElement(Stack, { grow: 12, className: "grayBorderLeft" },
                                                        React.createElement(Stack, { horizontal: true, className: "smallPadding padding-left peopleHeaderStyles", verticalFill: true, verticalAlign: "center" },
                                                            React.createElement(Label, { className: "peopleLabel" }, "Cabeza de canal"),
                                                            React.createElement("div", { style: { display: headOfChannel ? "block" : "none" } },
                                                                React.createElement(Persona
                                                                //TODO: Cargar imagen y account name
                                                                //{...this.examplePersona}
                                                                , { 
                                                                    //TODO: Cargar imagen y account name
                                                                    //{...this.examplePersona}
                                                                    text: headOfChannel ? headOfChannel.Value : null, size: PersonaSize.size24, 
                                                                    //presence={PersonaPresence.online}
                                                                    hidePersonaDetails: false, imageAlt: headOfChannel ? headOfChannel.Value : null }))),
                                                        React.createElement(Stack, { horizontal: true, className: "smallPadding padding-left peopleHeaderStyles", verticalFill: true, verticalAlign: "center" },
                                                            React.createElement(Label, { className: "peopleLabel" }, "Gerente/Kam (LP)"),
                                                            React.createElement("div", { style: { display: kam ? "block" : "none" } },
                                                                React.createElement(Persona
                                                                //TODO: Cargar imagen y account name
                                                                , { 
                                                                    //TODO: Cargar imagen y account name
                                                                    text: kam ? kam.Value : null, size: PersonaSize.size24, 
                                                                    //presence={PersonaPresence.online}
                                                                    hidePersonaDetails: false, imageAlt: kam ? kam.Value : null }))),
                                                        React.createElement(Stack, { horizontal: true, className: "smallPadding padding-left peopleHeaderStyles", verticalFill: true, verticalAlign: "center" },
                                                            React.createElement(Label, { className: "peopleLabel" }, "Canal (LP)"),
                                                            React.createElement(Label, { className: "labelNotBold" }, channel ? channel.Name : null)),
                                                        React.createElement(Stack, { horizontal: true, className: "smallPadding padding-left peopleHeaderStyles noMarginBottom", verticalFill: true, verticalAlign: "center" },
                                                            React.createElement(Label, { className: "peopleLabel" }, "Subcanal"),
                                                            React.createElement(Label, { className: "labelNotBold" }, subchannel ? subchannel.Value : null))))),
                                            React.createElement(Stack, null,
                                                React.createElement(Pivot, { className: "innerPivot", "aria-label": "Inner Pivot", overflowBehavior: "menu", onLinkClick: this.onTabLinkClicked.bind(this), selectedKey: this.state.selectedIndex.toString() },
                                                    entity.Items.map(function (item, index) {
                                                        var isInvalid = _this.state.hasValidationError && !item.IsValid();
                                                        return (React.createElement(PivotItem, { headerText: item.AdditionalID, headerButtonProps: {
                                                                'data-order': index + 1, 'data-title': item.AdditionalID, style: isInvalid ? {
                                                                    color: "#a4262c",
                                                                    border: "1px dashed #a4262c",
                                                                    borderBottomWidth: "0"
                                                                } : { border: "1px solid transparent" }
                                                            }, itemKey: index.toString() }));
                                                    }),
                                                    !readOnlyForm &&
                                                        React.createElement(PivotItem, { headerText: "Nuevo", itemIcon: "Add", onClick: this.AddPromoItem.bind(this), itemKey: "ADD" })),
                                                React.createElement(Stack, { className: "deleteProductContainer", horizontal: true, horizontalAlign: "end" },
                                                    React.createElement(Stack, { className: "label" },
                                                        React.createElement("div", { style: { display: entity.Items.length > 1 ? "block" : "none" } },
                                                            React.createElement(Link, { onClick: function () { return _this.setState({ hideDeleteProductDialog: false }); } },
                                                                React.createElement(Icon, { iconName: "MapLayers" }),
                                                                React.createElement("span", { style: { color: '#323130' } }, "Borrar producto")))),
                                                    React.createElement(Dialog, { hidden: this.state.hideDeleteProductDialog, dialogContentProps: this.deleteProductDialogContentProps, styles: this.confirmationDialogStyles, onDismiss: function () { return _this.setState({ hideDeleteProductDialog: true }); } },
                                                        React.createElement(DialogFooter, null,
                                                            React.createElement(PrimaryButton, { onClick: this.RemovePromoItem.bind(this), text: "Eliminar", style: {
                                                                    backgroundColor: "#425C68",
                                                                    border: "transparent"
                                                                } }),
                                                            React.createElement(DefaultButton, { onClick: function () { return _this.setState({ hideDeleteProductDialog: true }); }, text: "Cancelar" })))),
                                                React.createElement(Stack, { horizontal: true, styles: this.repetitiveSectionStyle, className: "padding" },
                                                    React.createElement(Stack, { grow: 8, className: "fixedStructure" },
                                                        React.createElement(Stack, { styles: { root: { maxHeight: "30px" } }, className: "smallPadding padding-right", grow: 6 },
                                                            React.createElement(Stack, { horizontal: true, className: "actividadTopadaContainer smallPadding-left" },
                                                                React.createElement(Stack, null,
                                                                    React.createElement(Label, null, "Actividad Topada")),
                                                                React.createElement(Stack, { className: "toRight smallPadding actividadTopadaToggle" },
                                                                    React.createElement(Toggle, { onText: "Si", offText: "No", onChange: this.onCappedActivityChanged.bind(this), checked: selectedItem.CappedActivity, disabled: readOnlyForm })))),
                                                        React.createElement(Stack, { horizontal: true, grow: 12, styles: { root: { paddingTop: "16px" } } },
                                                            React.createElement(Stack, { className: "smallPadding fixedStructure", grow: 6 },
                                                                React.createElement(Stack, { className: "padding-right controlPadding" }, !readOnlyForm ?
                                                                    React.createElement(Dropdown, { placeholder: "Seleccione un negocio", label: "BU:", options: businessUnits, 
                                                                        //disabled={entity.Client == null}
                                                                        selectedKey: selectedItem.BusinessUnit ? selectedItem.BusinessUnit.ItemId : null, onChanged: this.onBusinessUnitChanged.bind(this), required: true, errorMessage: this.getValidationErrorMessage(selectedItem.BusinessUnit) }) :
                                                                    React.createElement(TextField, { label: "BU:", value: selectedItem.BusinessUnit ? selectedItem.BusinessUnit.Value : "", readOnly: true })),
                                                                React.createElement(Stack, { className: "padding-right controlPadding" }, !readOnlyForm ?
                                                                    React.createElement(Dropdown, { placeholder: "Seleccione una categor\u00EDa", label: "Categoria de la Promoci\u00F3n (LD):", options: categories, selectedKey: selectedItem.Category ? selectedItem.Category.ItemId : null, onChanged: this.onCategoryChanged.bind(this), required: true, errorMessage: this.getValidationErrorMessage(selectedItem.Category) }) :
                                                                    React.createElement(TextField, { label: "Categoria de la Promoci\u00F3n (LD)", value: selectedItem.Category ? selectedItem.Category.Name : "", readOnly: true })),
                                                                React.createElement(Stack, { className: "padding-right controlPadding" },
                                                                    React.createElement(TextField, { label: "Descripci\u00F3n corta:", onChange: this.onShortDescriptionChange.bind(this), value: selectedItem ? selectedItem.ShortDescription : "", required: !readOnlyForm, autoComplete: "Off", errorMessage: this.getValidationErrorMessage(selectedItem.ShortDescription), readOnly: readOnlyForm, maxLength: 100 })),
                                                                React.createElement(Stack, { className: "padding-right controlPadding" }, !readOnlyForm ?
                                                                    React.createElement(ProductSelector, { clientProducts: this.GetFilteredProducts(), onChanged: this.onProductChanged.bind(this), value: selectedItem.ClientProduct, errorMessage: this.getValidationErrorMessage(selectedItem.Client), required: readOnlyForm, isDisabled: entity.Client == null }) :
                                                                    React.createElement(TextField, { label: "SKU", value: selectedItem.ClientProduct ? selectedItem.ClientProduct.SKUNumber + " - " + selectedItem.ClientProduct.SKUDescription : "", readOnly: true })),
                                                                React.createElement(Stack, { className: "padding-right controlPadding" }, !readOnlyForm ?
                                                                    React.createElement(RBDatePicker, { label: "Fecha de comienzo", onSelectDate: this.onSelectStartDate.bind(this), required: !readOnlyForm, value: selectedItem.StartDate, errorMessage: this.getValidationErrorMessage(selectedItem.StartDate), maxDate: selectedItem.EndDate }) :
                                                                    React.createElement(TextField, { label: "Fecha de comienzo", value: CommonHelper.formatDate(selectedItem.StartDate), readOnly: true })),
                                                                React.createElement(Stack, { className: "padding-right controlPadding" },
                                                                    React.createElement(TextField, { label: "Descuento por pieza ($):", onChange: this.onDiscountPerPieceChange.bind(this), value: selectedItem.GetDiscountPerPieceAsString(), required: selectedItem.RequiresDiscountPerPiece() && !readOnlyForm, autoComplete: "Off", disabled: !selectedItem.RequiresDiscountPerPiece(), errorMessage: selectedItem.RequiresDiscountPerPiece() ? this.getValidationErrorMessage(selectedItem.GetDiscountPerPieceAsString()) : CommonHelper.EmptyString, readOnly: readOnlyForm, type: "number", step: 0.01 }))),
                                                            React.createElement(Stack, { className: "smallPadding fixedStructure", grow: 6 },
                                                                React.createElement(Stack, { className: "padding-right controlPadding" }, !readOnlyForm ?
                                                                    React.createElement(Dropdown, { placeholder: "Seleccione una categor\u00EDa", label: "Categor\u00EDa:", options: productCategories, 
                                                                        //disabled={entity.Client == null}
                                                                        selectedKey: selectedItem.ProductCategory ? selectedItem.ProductCategory.ItemId : null, onChanged: this.onProductCategoryChanged.bind(this), required: true, errorMessage: this.getValidationErrorMessage(selectedItem.ProductCategory) }) :
                                                                    React.createElement(TextField, { label: "Categor\u00EDa:", value: selectedItem.ProductCategory ? selectedItem.ProductCategory.Value : "", readOnly: true })),
                                                                React.createElement(Stack, { className: "padding-right controlPadding" }, !readOnlyForm ?
                                                                    React.createElement(Dropdown, { placeholder: "Seleccione un tipo", label: "Tipo de Promocion (LD):", options: types, disabled: this.state.loadingTypes || types.length === 0, selectedKey: selectedItem.Type ? selectedItem.Type.ItemId : null, onChanged: this.onTypeChanged.bind(this), required: true, errorMessage: this.getValidationErrorMessage(selectedItem.Type) }) :
                                                                    React.createElement(TextField, { label: "Tipo de Promocion (LD)", value: selectedItem.Type ? selectedItem.Type.Name : "", readOnly: true })),
                                                                React.createElement(Stack, { className: "padding-right controlPadding" },
                                                                    React.createElement(TextField, { label: "Inversi\u00F3n ($):", onChange: this.onInvestmentChange.bind(this), value: selectedItem ? selectedItem.GetInvestmentAsString() : "", required: selectedItem.RequiresInvestment() && !readOnlyForm, autoComplete: "Off", disabled: !selectedItem.RequiresInvestment(), errorMessage: selectedItem.RequiresInvestment() ? this.getValidationErrorMessage(selectedItem.GetInvestmentAsString()) : CommonHelper.EmptyString, readOnly: readOnlyForm, type: "number", step: 0.01 })),
                                                                React.createElement(Stack, { className: "padding-right controlPadding" }, !readOnlyForm ?
                                                                    React.createElement(Dropdown, { placeholder: "Seleccione una marca", label: "Marca:", options: brands, 
                                                                        //disabled={entity.Client == null}
                                                                        selectedKey: selectedItem.Brand ? selectedItem.Brand.ItemId : null, onChanged: this.onBrandChanged.bind(this), required: true, errorMessage: this.getValidationErrorMessage(selectedItem.Brand) }) :
                                                                    React.createElement(TextField, { label: "Marca:", value: selectedItem.Brand ? selectedItem.Brand.Value : "", readOnly: true })),
                                                                React.createElement(Stack, { className: "padding-right controlPadding" }, !readOnlyForm ?
                                                                    React.createElement(RBDatePicker, { label: "Fecha fin", onSelectDate: this.onSelectEndDate.bind(this), required: !readOnlyForm, value: selectedItem.EndDate, errorMessage: this.getValidationErrorMessage(selectedItem.EndDate), minDate: selectedItem.StartDate }) :
                                                                    React.createElement(TextField, { label: "Fecha fin", value: CommonHelper.formatDate(selectedItem.EndDate), readOnly: true })),
                                                                React.createElement(Stack, { className: "padding-right controlPadding" },
                                                                    React.createElement(TextField, { label: "% Redenci\u00F3n", onChange: this.onRedemptionChange.bind(this), value: selectedItem.GetRedemptionAsString(), required: selectedItem.RequiresRedemption() && !readOnlyForm, autoComplete: "Off", disabled: !selectedItem.RequiresRedemption(), errorMessage: selectedItem.RequiresRedemption() ? this.getValidationErrorMessage(selectedItem.GetRedemptionAsString()) : CommonHelper.EmptyString, readOnly: readOnlyForm, type: "number", step: 0.01 }))))),
                                                    React.createElement(Stack, { grow: 4, className: "fixedStructure" },
                                                        React.createElement(Stack, { className: "smallPadding", grow: 4, horizontal: true },
                                                            React.createElement(Stack, { grow: 12, className: "grayBorderLeft" },
                                                                React.createElement(Stack, { horizontal: true, className: "grayHeader padding padding-left padding-right" },
                                                                    React.createElement(Icon, { iconName: "DietPlanNotebook" }),
                                                                    React.createElement(Label, null, "Detalles de la promoci\u00F3n")),
                                                                React.createElement(Stack, { className: "grayContent smallPadding padding-left padding-right", verticalFill: true },
                                                                    React.createElement(Stack, { verticalFill: true, horizontal: true, className: "verticalPadding detailsControlPadding borderBottom", verticalAlign: "center" },
                                                                        React.createElement(Label, null, "Precio neto OFF"),
                                                                        React.createElement(Label, { className: "toRight" }, selectedItem.RequiresNetPrice() ? (entity.Config.CurrencySymbol + " " + selectedItem.GetNetPriceAsString()) : "N/A")),
                                                                    React.createElement(Stack, { verticalFill: true, horizontal: true, className: "verticalPadding detailsControlPadding borderBottom", verticalAlign: "center" },
                                                                        React.createElement(Label, null, "% Descuento"),
                                                                        React.createElement(Label, { className: "toRight" }, selectedItem.RequiresDiscountPerPiece() ? (selectedItem.GetDiscountPercentageAsString() + "%") : "N/A")),
                                                                    React.createElement(Stack, { verticalFill: true, horizontal: true, className: "verticalPadding detailsControlPadding borderBottom", verticalAlign: "center" },
                                                                        React.createElement(Label, null, "BEP NR"),
                                                                        React.createElement(Label, { className: "toRight" }, selectedItem.GetBEPNRAsString() + "%")),
                                                                    React.createElement(Stack, { verticalFill: true, horizontal: true, className: "verticalPadding detailsControlPadding borderBottom", verticalAlign: "center" },
                                                                        React.createElement(Label, null, "GM %NR"),
                                                                        React.createElement(Label, { className: "toRight" }, selectedItem.GetGMPercentageNRAsString() + "%")),
                                                                    React.createElement(Stack, { verticalFill: true, horizontal: true, className: "verticalPadding detailsControlPadding borderBottom", verticalAlign: "center" },
                                                                        React.createElement(Label, null, "GM %NR con promo"),
                                                                        React.createElement(Label, { className: "toRight" }, selectedItem.RequiresDiscountPerPiece() ? selectedItem.GetGMPercentageNRWithPromoAsString() + "%" : "N/A")),
                                                                    React.createElement(Stack, { verticalFill: true, horizontal: true, className: "verticalPadding detailsControlPadding borderBottom", verticalAlign: "center" },
                                                                        React.createElement(Label, null, "GM Base Unit"),
                                                                        React.createElement(Label, { className: "toRight" }, entity.Config.CurrencySymbol + " " + selectedItem.GetGMBaseUnitAsString())),
                                                                    React.createElement(Stack, { verticalFill: true, horizontal: true, className: "verticalPadding detailsControlPadding borderBottom", verticalAlign: "center" },
                                                                        React.createElement(Label, null, "GM Promo Unit"),
                                                                        React.createElement(Label, { className: "toRight" }, entity.Config.CurrencySymbol + " " + selectedItem.GetGMPromoUnitAsString())),
                                                                    React.createElement(Stack, { verticalFill: true, horizontal: true, className: "verticalPadding detailsControlPadding borderBottom", verticalAlign: "center" },
                                                                        React.createElement(Label, null, "BEP GM"),
                                                                        React.createElement(Label, { className: "toRight" }, selectedItem.RequiresDiscountPerPiece() ? (selectedItem.GetBEPGMAsString() + "%") : "N/A"))))))),
                                                React.createElement(Stack, { className: "padding-bottom" },
                                                    React.createElement(Stack, { horizontal: true, className: "grayHeader smallPadding padding-left padding-right" },
                                                        React.createElement(Stack, { grow: 3, horizontal: true, className: "verticalPadding preAnalisisPadding fixedStructure" },
                                                            React.createElement(Icon, { iconName: "DietPlanNotebook" }),
                                                            React.createElement(Label, null, "Pre an\u00E1lisis")),
                                                        React.createElement(Stack, { grow: 3, horizontalAlign: "end", className: "fixedStructure" },
                                                            React.createElement(Label, null, "Inversi\u00F3n estimada"),
                                                            React.createElement(Label, null, entity.Config.CurrencySymbol + " " + selectedItem.GetEstimatedInvestmentAsString())),
                                                        React.createElement(Stack, { grow: 3, horizontalAlign: "end", className: "fixedStructure" },
                                                            React.createElement(Label, null, "ROI Estimado por SKU"),
                                                            React.createElement(Label, null, selectedItem.GetROIAsString())),
                                                        React.createElement(Stack, { grow: 3, horizontalAlign: "end", className: "fixedStructure" },
                                                            React.createElement(Label, null, "Efectividad"),
                                                            React.createElement("div", { hidden: !selectedItem.IsEffective(), className: "effectiveLabelContainer" },
                                                                React.createElement("span", { className: "effectiveLabel" }, "EFECTIVA")),
                                                            React.createElement("div", { hidden: selectedItem.IsEffective(), className: "effectiveLabelContainer" },
                                                                React.createElement("span", { className: "effectiveLabel notEffectiveLabel" }, "NO EFECTIVA")))),
                                                    React.createElement(Stack, { className: "grayContent padding padding-left padding-right" },
                                                        React.createElement(Stack, { horizontal: true },
                                                            React.createElement(Stack, { className: "smallPadding padding-right controlPadding fixedStructure", grow: 4 },
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(TextField, { label: "Volumen base", onChange: this.onBaseVolumeChange.bind(this), value: selectedItem.GetBaseVolumeAsString(), required: !readOnlyForm, autoComplete: "Off", errorMessage: this.getValidationErrorMessage(selectedItem.GetBaseVolumeAsString()), readOnly: readOnlyForm, width: "100%" })),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "Volumen LY"),
                                                                    React.createElement(Label, { className: "toRight" }, selectedItem.GetLastYearVolumeAsString())),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "NR base"),
                                                                    React.createElement(Label, { className: "toRight" }, selectedItem.RequiresBaseNR() ? (entity.Config.CurrencySymbol + " " + selectedItem.GetBaseNRAsString()) : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "GM base"),
                                                                    React.createElement(Label, { className: "toRight" }, selectedItem.RequiresBaseGM() ? (entity.Config.CurrencySymbol + " " + selectedItem.GetBaseGMAsString()) : "N/A")),
                                                                React.createElement(Stack, { className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(TextField, { label: "Inversi\u00F3n adicional (MKT)", onChange: this.onAdditionalInvestmentChange.bind(this), value: selectedItem.GetAdditionalInvestmentAsString(), autoComplete: "Off", readOnly: readOnlyForm, width: "100%", type: "number", step: 0.01 }))),
                                                            React.createElement(Stack, { className: "smallPadding padding-right controlPadding fixedStructure", grow: 4 },
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(TextField, { label: "Volumen incremental estimado", onChange: this.onEstimatedIncrementalVolumeChange.bind(this), value: selectedItem.GetEstimatedIncrementalVolumeAsString(), required: !readOnlyForm, autoComplete: "Off", errorMessage: this.getValidationErrorMessage(selectedItem.GetEstimatedIncrementalVolumeAsString()), readOnly: readOnlyForm, width: "100%" })),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "Volume Average L 3 Months"),
                                                                    React.createElement(Label, { className: "toRight" }, selectedItem.GetAverageVolumeL3MonthsAsString())),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "NR incremental estimado"),
                                                                    React.createElement(Label, { className: "toRight" }, selectedItem.RequiresIncrementalEstimatedNR() ? (entity.Config.CurrencySymbol + " " + selectedItem.GetIncrementalEstimatedNRAsString()) : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "GM promo estimado"),
                                                                    React.createElement(Label, { className: "toRight" }, selectedItem.RequiresEstimatedGMPromo() ? (entity.Config.CurrencySymbol + " " + selectedItem.GetEstimatedGMPromoAsString()) : "N/A"))),
                                                            React.createElement(Stack, { className: "smallPadding padding-right controlPadding fixedStructure", grow: 4 },
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "Total volumen estimado"),
                                                                    React.createElement(Label, { className: "toRight" }, selectedItem.RequiresTotalEstimatedVolume() ? selectedItem.GetTotalEstimatedVolumeAsString() : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "% Volumen Incremental"),
                                                                    React.createElement(Label, { className: "toRight" }, selectedItem.RequiresIncrementalVolumePercentage() ? (selectedItem.GetIncrementalVolumePercentageAsString() + "%") : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "NR Estimado"),
                                                                    React.createElement(Label, { className: "toRight" }, selectedItem.RequiresEstimatedNR() ? entity.Config.CurrencySymbol + " " + selectedItem.GetEstimatedNRAsString() : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding controlPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "GM incremental"),
                                                                    React.createElement(Label, { className: "toRight" }, selectedItem.RequiresIncrementalGM() ? (entity.Config.CurrencySymbol + " " + selectedItem.GetIncrementalGMAsString()) : "N/A"))))))),
                                            React.createElement("div", { hidden: entity.WorkflowLog == null || entity.WorkflowLog.length == 0 },
                                                React.createElement(Stack, { className: "padding-bottom" },
                                                    React.createElement(Stack, { horizontal: true, className: "grayHeader smallPadding padding-left padding-right" },
                                                        React.createElement(Stack, { horizontal: true, className: "verticalPadding preAnalisisPadding fixedStructure" },
                                                            React.createElement(Icon, { iconName: "TaskLogo" }),
                                                            React.createElement(Label, null, "Aprobaciones"))),
                                                    React.createElement(Stack, { className: "grayContent padding padding-left padding-right" }, entity.WorkflowLog.map(function (log) {
                                                        return (React.createElement(Stack, { grow: 12 },
                                                            React.createElement(Stack, { grow: 12, horizontal: true, className: "borderBottom" },
                                                                React.createElement(Stack, null,
                                                                    React.createElement(Icon, { className: "workflowIcon", iconName: log.Action == "Aprobar" || log.Action == "Comprobada" ? "CheckMark" : "Cancel" })),
                                                                React.createElement(Stack, { grow: 10 },
                                                                    React.createElement(Stack, { horizontal: true, className: "verticalPadding" },
                                                                        React.createElement("span", null,
                                                                            " ",
                                                                            log.User.Value + " - " + log.DateAndTimeAsString() + " - Accion: " + log.Action)),
                                                                    React.createElement(Stack, { horizontal: true, className: "verticalPadding" },
                                                                        React.createElement("span", { hidden: CommonHelper.IsNullOrEmpty(log.Comments) },
                                                                            "Comentarios: ",
                                                                            log.Comments))))));
                                                    })))))),
                                    React.createElement(PivotItem, { onRenderItemLink: this._customPromotionSummaryPivotItemRenderer },
                                        React.createElement(Stack, { className: "summarySectionContainer" },
                                            React.createElement(Stack, { styles: this.repetitiveSectionStyle },
                                                React.createElement(Stack, { className: "statusContainer smallPadding padding-right", horizontal: true, horizontalAlign: "end" },
                                                    React.createElement(Stack, { style: { color: theme.palette.themePrimary, paddingRight: "4px" } },
                                                        React.createElement(Icon, { iconName: "MapLayers" })),
                                                    React.createElement(Stack, { className: "label" }, "Estado:"),
                                                    React.createElement(Stack, { style: { color: theme.palette.themePrimary, fontWeight: "bold" } }, entity.GetStatusText())),
                                                React.createElement(Stack, { horizontal: true, className: "padding" },
                                                    React.createElement(Stack, { grow: 8, verticalAlign: "start", className: "fixedStructure" },
                                                        React.createElement(Stack, { grow: 12, className: "grayContent padding padding-left padding-right" },
                                                            React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom" },
                                                                React.createElement(Label, null, "Cliente"),
                                                                React.createElement(Label, { className: "toRight" }, entity.Client ? entity.Client.Name : null)),
                                                            React.createElement(Stack, { className: "verticalPadding borderBottom" },
                                                                React.createElement(Label, null, "Objetivo de la promoci\u00F3n"),
                                                                React.createElement("span", { className: "twoColumnsContentMaxWidth" }, entity.ActivityObjective)))),
                                                    React.createElement(Stack, { grow: 4, horizontal: true, className: "fixedStructure" },
                                                        React.createElement(Stack, { grow: 12, className: "grayBorderLeft" },
                                                            React.createElement(Stack, { horizontal: true, className: "smallPadding padding-left peopleHeaderStyles", verticalFill: true, verticalAlign: "center" },
                                                                React.createElement(Label, { className: "peopleLabel" }, "Cabeza de canal"),
                                                                React.createElement("div", { style: { display: headOfChannel ? "block" : "none" } },
                                                                    React.createElement(Persona
                                                                    //TODO: Cargar imagen y account name
                                                                    //{...this.examplePersona}
                                                                    , { 
                                                                        //TODO: Cargar imagen y account name
                                                                        //{...this.examplePersona}
                                                                        text: headOfChannel ? headOfChannel.Value : null, size: PersonaSize.size24, 
                                                                        //presence={PersonaPresence.online}
                                                                        hidePersonaDetails: false, imageAlt: headOfChannel ? headOfChannel.Value : null }))),
                                                            React.createElement(Stack, { horizontal: true, className: "smallPadding padding-left peopleHeaderStyles", verticalFill: true, verticalAlign: "center" },
                                                                React.createElement(Label, { className: "peopleLabel" }, "Gerente KAM"),
                                                                React.createElement("div", { style: { display: kam ? "block" : "none" } },
                                                                    React.createElement(Persona
                                                                    //TODO: Cargar imagen y account name
                                                                    , { 
                                                                        //TODO: Cargar imagen y account name
                                                                        text: kam ? kam.Value : null, size: PersonaSize.size24, 
                                                                        //presence={PersonaPresence.online}
                                                                        hidePersonaDetails: false, imageAlt: kam ? kam.Value : null }))),
                                                            React.createElement(Stack, { horizontal: true, className: "smallPadding padding-left peopleHeaderStyles", verticalFill: true, verticalAlign: "center" },
                                                                React.createElement(Label, { className: "peopleLabel" }, "Canal"),
                                                                React.createElement(Label, { className: "labelNotBold" }, channel ? channel.Name : null)),
                                                            React.createElement(Stack, { horizontal: true, className: "smallPadding padding-left peopleHeaderStyles", verticalFill: true, verticalAlign: "center" },
                                                                React.createElement(Label, { className: "peopleLabel" }, "Subcanal"),
                                                                React.createElement(Label, { className: "labelNotBold" }, subchannel ? subchannel.Value : null))))),
                                                entity.Items.map(function (item, _index) {
                                                    return (React.createElement(Stack, { className: "padding-bottom" },
                                                        React.createElement(Stack, { horizontal: true, className: "grayHeader smallPadding padding-left padding-right" },
                                                            React.createElement(Stack, { grow: 3, horizontal: true, className: "verticalPadding preAnalisisPadding fixedStructure" },
                                                                React.createElement(Icon, { iconName: "DietPlanNotebook" }),
                                                                React.createElement(Label, null,
                                                                    "Pre an\u00E1lisis ",
                                                                    item.AdditionalID)),
                                                            React.createElement(Stack, { grow: 3, horizontalAlign: "end", className: "fixedStructure" },
                                                                React.createElement(Label, null, "Inversi\u00F3n estimada"),
                                                                React.createElement(Label, null, entity.Config.CurrencySymbol + " " + item.GetEstimatedInvestmentAsString())),
                                                            React.createElement(Stack, { grow: 3, horizontalAlign: "end", className: "fixedStructure" },
                                                                React.createElement(Label, null, "ROI Estimado por SKU"),
                                                                React.createElement(Label, null, item.GetROIAsString())),
                                                            React.createElement(Stack, { grow: 3, horizontalAlign: "end", className: "fixedStructure" },
                                                                React.createElement(Label, null, "Efectividad"),
                                                                React.createElement("div", { hidden: !item.IsEffective(), className: "effectiveLabelContainer" },
                                                                    React.createElement("span", { className: "effectiveLabel" }, "EFECTIVA")),
                                                                React.createElement("div", { hidden: item.IsEffective(), className: "effectiveLabelContainer" },
                                                                    React.createElement("span", { className: "effectiveLabel notEffectiveLabel" }, "NO EFECTIVA")))),
                                                        React.createElement(Stack, { horizontal: true, className: "grayContent padding padding-left padding-right" },
                                                            React.createElement(Stack, { className: "smallPadding padding-right controlPadding fixedStructure", grow: 4 },
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "Volumen base"),
                                                                    React.createElement(Label, { className: "toRight" }, item.GetBaseVolumeAsString())),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "Volumen LY"),
                                                                    React.createElement(Label, { className: "toRight" }, item.GetLastYearVolumeAsString())),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "NR base"),
                                                                    React.createElement(Label, { className: "toRight" }, item.RequiresBaseNR() ? (entity.Config.CurrencySymbol + " " + item.GetBaseNRAsString()) : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "GM base"),
                                                                    React.createElement(Label, { className: "toRight" }, item.RequiresBaseGM() ? (entity.Config.CurrencySymbol + " " + item.GetBaseGMAsString()) : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "Inversi\u00F3n adicional (MKT)"),
                                                                    React.createElement(Label, { className: "toRight" }, item.GetAdditionalInvestmentAsString()))),
                                                            React.createElement(Stack, { className: "smallPadding padding-right fixedStructure", grow: 4 },
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "Volumen incremental estimado"),
                                                                    React.createElement(Label, { className: "toRight" }, item.GetEstimatedIncrementalVolumeAsString())),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "Volume Average L 3 Months"),
                                                                    React.createElement(Label, { className: "toRight" }, item.GetAverageVolumeL3MonthsAsString())),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "NR incremental estimado"),
                                                                    React.createElement(Label, { className: "toRight" }, item.RequiresIncrementalEstimatedNR() ? (entity.Config.CurrencySymbol + " " + item.GetIncrementalEstimatedNRAsString()) : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "GM promo estimado"),
                                                                    React.createElement(Label, { className: "toRight" }, item.RequiresEstimatedGMPromo() ? (entity.Config.CurrencySymbol + " " + item.GetEstimatedGMPromoAsString()) : "N/A"))),
                                                            React.createElement(Stack, { className: "smallPadding fixedStructure", grow: 4 },
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "Total volumen estimado"),
                                                                    React.createElement(Label, { className: "toRight" }, item.RequiresTotalEstimatedVolume() ? item.GetTotalEstimatedVolumeAsString() : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "% Volumen Incremental"),
                                                                    React.createElement(Label, { className: "toRight" }, item.RequiresIncrementalVolumePercentage() ? (item.GetIncrementalVolumePercentageAsString() + "%") : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "NR Estimado"),
                                                                    React.createElement(Label, { className: "toRight" }, item.RequiresEstimatedNR() ? entity.Config.CurrencySymbol + " " + item.GetEstimatedNRAsString() : "N/A")),
                                                                React.createElement(Stack, { horizontal: true, className: "verticalPadding borderBottom alignMiddle" },
                                                                    React.createElement(Label, null, "GM incremental"),
                                                                    React.createElement(Label, { className: "toRight" }, item.RequiresIncrementalGM() ? (entity.Config.CurrencySymbol + " " + item.GetIncrementalGMAsString()) : "N/A"))))));
                                                })))),
                                    React.createElement(PivotItem, { onRenderItemLink: entity.GetStatusId() == PromoStatus.Approved ? this._customPromotionEvidencePivotItemRenderer : null },
                                        React.createElement(Stack, { className: "evidenceSectionContainer" },
                                            React.createElement(Stack, { styles: this.repetitiveSectionStyle },
                                                React.createElement(Stack, { className: "statusContainer smallPadding padding-right", horizontal: true, horizontalAlign: "end" },
                                                    React.createElement(Stack, { style: { color: theme.palette.themePrimary, paddingRight: "4px" } },
                                                        React.createElement(Icon, { iconName: "MapLayers" })),
                                                    React.createElement(Stack, { className: "label" }, "Estado:"),
                                                    React.createElement(Stack, { style: { color: theme.palette.themePrimary, fontWeight: "bold" } }, entity.GetStatusText())),
                                                React.createElement(Stack, { className: "padding" },
                                                    React.createElement(Stack, { className: "grayContent padding padding-left padding-right" },
                                                        React.createElement(Stack, { className: "padding-bottom" }, "Utilice esta seccion para subir archivos de evidencia"),
                                                        React.createElement(Stack, { className: "multilineControlPadding" },
                                                            React.createElement(TextField, { label: "Descripci\u00F3n", multiline: true, rows: 3, autoComplete: "Off", required: true, onChange: this.onEvidenceDescriptionChange.bind(this), errorMessage: this.getEvidenceValidationErrorMessage(this.state.evidenceDescription) })),
                                                        React.createElement(Stack, { className: "controlPadding", horizontal: true },
                                                            React.createElement(Stack, { grow: 4, className: "fixedStructure" },
                                                                React.createElement(RBDatePicker, { label: "Fecha de evidencia", onSelectDate: this.onSelectEvidenceDate.bind(this), required: true, value: this.state.evidenceDate, errorMessage: this.getEvidenceValidationErrorMessage(this.state.evidenceDate), minDate: entity.GetFromDate() })),
                                                            React.createElement(Stack, { grow: 8, className: "fixedStructure" })),
                                                        React.createElement(Stack, { className: "controlPadding", horizontal: true },
                                                            React.createElement("input", { id: "evidence_file_input", type: "file", onChange: this.onFileChanged.bind(this), hidden: true }),
                                                            React.createElement(PrimaryButton, { text: "Seleccionar archivo", style: {
                                                                    backgroundColor: "#425C68",
                                                                    border: "transparent"
                                                                }, onClick: function () {
                                                                    if (!_this.validateEvidence())
                                                                        return;
                                                                    document.getElementById("evidence_file_input").click();
                                                                } })))),
                                                React.createElement(Stack, { className: "padding-bottom" },
                                                    React.createElement(Stack, { horizontal: true, className: "grayHeader smallPadding padding-left padding-right" },
                                                        React.createElement(Stack, { grow: 12, horizontal: true, className: "verticalPadding preAnalisisPadding fixedStructure" },
                                                            React.createElement(Icon, { iconName: "Attach" }),
                                                            React.createElement(Label, null, "Archivos de evidencia"))),
                                                    React.createElement(Stack, { className: "grayContent padding padding-left padding-right" },
                                                        React.createElement("table", null,
                                                            React.createElement("thead", null,
                                                                React.createElement("th", null, "Nombre de archivo"),
                                                                React.createElement("th", null, "Descripcion"),
                                                                React.createElement("th", null, "Fecha"),
                                                                React.createElement("th", null)),
                                                            React.createElement("tbody", null, entity.Evidence.map(function (evidence, index) {
                                                                if (!evidence.Deleted) {
                                                                    return (React.createElement("tr", null,
                                                                        React.createElement("td", null,
                                                                            React.createElement("div", { hidden: CommonHelper.IsNullOrEmpty(evidence.FileUrl) },
                                                                                React.createElement(Link, { href: evidence.FileUrl, target: "_blank" }, evidence.FileName)),
                                                                            React.createElement("div", { hidden: !CommonHelper.IsNullOrEmpty(evidence.FileUrl) }, evidence.FileName)),
                                                                        React.createElement("td", null, evidence.Description),
                                                                        React.createElement("td", null, CommonHelper.formatDate(evidence.Date)),
                                                                        React.createElement("td", null,
                                                                            React.createElement(Stack, { className: "label" },
                                                                                React.createElement(Link, { onClick: function () { return _this.setState({ hideDeleteEvidenceDialog: false }); } },
                                                                                    React.createElement(Icon, { iconName: "MapLayers" }),
                                                                                    React.createElement("span", { style: { color: '#323130' } }, "Borrar evidencia"))),
                                                                            React.createElement(Dialog, { hidden: _this.state.hideFileExistsMessageDialog, dialogContentProps: _this.fileExistsDialogContentProps, styles: _this.confirmationDialogStyles, onDismiss: function () { return _this.setState({ hideFileExistsMessageDialog: true }); } },
                                                                                React.createElement(DialogFooter, null,
                                                                                    React.createElement(DefaultButton, { onClick: function () {
                                                                                            _this.setState({ hideFileExistsMessageDialog: true });
                                                                                        }, text: "OK" }))),
                                                                            React.createElement(Dialog, { hidden: _this.state.hideDeleteEvidenceDialog, dialogContentProps: _this.deleteEvidenceDialogContentProps, styles: _this.confirmationDialogStyles, onDismiss: function () { return _this.setState({ hideDeleteEvidenceDialog: true }); } },
                                                                                React.createElement(DialogFooter, null,
                                                                                    React.createElement(PrimaryButton, { onClick: function () {
                                                                                            _this.setState(function (state) {
                                                                                                var newState = state;
                                                                                                var currentEvidence = newState.viewModel.Entity.Evidence[index];
                                                                                                if (currentEvidence.File) {
                                                                                                    newState.viewModel.Entity.Evidence.splice(index, 1);
                                                                                                }
                                                                                                else {
                                                                                                    newState.viewModel.Entity.Evidence[index].Deleted = true;
                                                                                                }
                                                                                                newState.hideDeleteEvidenceDialog = true;
                                                                                                return newState;
                                                                                            });
                                                                                        }, text: "Eliminar", style: {
                                                                                            backgroundColor: "#425C68",
                                                                                            border: "transparent"
                                                                                        } }),
                                                                                    React.createElement(DefaultButton, { onClick: function () {
                                                                                            _this.setState({ hideDeleteEvidenceDialog: true });
                                                                                        }, text: "Cancelar" }))))));
                                                                }
                                                            })))))))))),
                            React.createElement("div", { className: "modalBottom" },
                                React.createElement(Stack, { className: "borderBottom" },
                                    React.createElement(Label, null, "Estado general de la promoci\u00F3n")),
                                React.createElement(Stack, { className: "modalBottomContent verticalPadding", horizontal: true, grow: 12 },
                                    React.createElement(Stack, { grow: 1 },
                                        React.createElement(Label, { className: "modalBottomContentHeader" }, "Efectividad"),
                                        React.createElement("div", { hidden: !entity.IsEffective(), className: "effectiveLabelContainer" },
                                            React.createElement("span", { className: "effectiveLabel" }, "EFECTIVA")),
                                        React.createElement("div", { hidden: entity.IsEffective(), className: "effectiveLabelContainer" },
                                            React.createElement("span", { className: "effectiveLabel notEffectiveLabel" }, "NO EFECTIVA"))),
                                    React.createElement(Stack, { grow: 1, className: "fixedStructure" },
                                        React.createElement(Label, { className: "modalBottomContentHeader" }, "ROI Estimado total"),
                                        React.createElement(Label, { className: "modalBottomContentValue" }, entity.GetROIAsString())),
                                    React.createElement(Stack, { grow: 1, className: "fixedStructure" },
                                        React.createElement(Label, { className: "modalBottomContentHeader" }, "Inversi\u00F3n estimada total"),
                                        React.createElement(Label, { className: "modalBottomContentValue" }, entity.Config.CurrencySymbol + " " + entity.GetTotalEstimatedInvestmentAsString())),
                                    React.createElement(Stack, { grow: 2, className: "modalBottomButtonsContainer fixedStructure", horizontal: true, horizontalAlign: "end" },
                                        React.createElement(Stack, { grow: 6, className: "fixedStructure" },
                                            React.createElement(DefaultButton, { style: { display: this.state.viewModel.ShowSaveButton ? "block" : "none" }, text: "Guardar borrador", allowDisabledFocus: true, onClick: this.save.bind(this), disabled: !this.state.enableSubmit }),
                                            React.createElement(PrimaryButton, { style: {
                                                    display: this.state.viewModel.ShowApproveButton ? "block" : "none",
                                                    backgroundColor: "#425C68",
                                                    border: "transparent"
                                                }, text: "Aprobar", allowDisabledFocus: true, onClick: this.approve.bind(this) }),
                                            React.createElement(Dropdown, { style: {
                                                    display: this.state.flowApproval ? "block" : "none",
                                                }, placeholder: "Selecciona un flujo", 
                                                //label="Tipo flujo:"
                                                options: this.state.viewModel.FlowsTypes == undefined ? [] : this.state.viewModel.FlowsTypes }),
                                            React.createElement(Dialog, { hidden: this.state.hideSavingSpinnerConfirmationDialog, dialogContentProps: this.savingSpinnerModalDialogContentProps, styles: this.confirmationDialogStyles },
                                                React.createElement("div", null,
                                                    React.createElement(Spinner, { label: "Estamos guardando los datos..." }))),
                                            React.createElement(Dialog, { hidden: this.state.hideActionConfirmationDialog, styles: { main: { width: '450px important!' } }, className: "workflowCommentsModal", dialogContentProps: {
                                                    title: this.state.actionConfirmationDialogTitle
                                                } },
                                                React.createElement(Stack, null,
                                                    React.createElement(Stack, { className: "controlPadding" },
                                                        React.createElement(TextField, { label: "Comentarios" + (this.state.actionConfirmationDialogType == ActionConfirmationType.Approve ? " (opcional)" : ""), required: this.state.actionConfirmationDialogType == ActionConfirmationType.Reject, multiline: true, value: this.state.actionsComments, onChange: this.onActionCommentsChange.bind(this), rows: 6, autoComplete: "Off", errorMessage: this.state.enableActionValidation && CommonHelper.IsNullOrEmpty(this.state.actionsComments) ? Constants.Messages.RequiredField : "" })),
                                                    React.createElement(Stack, { horizontal: true, className: "smallPadding toRight" },
                                                        React.createElement(Stack, { className: "padding-right" },
                                                            React.createElement(PrimaryButton, { text: "Confirmar", allowDisabledFocus: true, onClick: this.confirmAction.bind(this), disabled: !this.state.enableSubmit, style: {
                                                                    backgroundColor: "#425C68",
                                                                    border: "transparent"
                                                                } })),
                                                        React.createElement(Stack, null,
                                                            React.createElement(DefaultButton, { text: "Cancelar", allowDisabledFocus: true, onClick: function () {
                                                                    _this.setState({
                                                                        hideActionConfirmationDialog: true,
                                                                        actionsComments: CommonHelper.EmptyString,
                                                                        enableActionValidation: false
                                                                    });
                                                                }, disabled: !this.state.enableSubmit })))))),
                                        React.createElement(Stack, { grow: 6, className: "fixedStructure" },
                                            React.createElement(PrimaryButton, { style: {
                                                    display: this.state.viewModel.ShowSubmitButton ? "block" : "none",
                                                    backgroundColor: "#425C68",
                                                    border: "transparent"
                                                }, text: "Enviar a aprobaci\u00F3n", allowDisabledFocus: true, onClick: this.submit.bind(this), disabled: !this.state.enableSubmit }),
                                            React.createElement(DefaultButton, { style: { display: this.state.viewModel.ShowRejectButton ? "block" : "none" }, text: "Rechazar", allowDisabledFocus: true, onClick: this.reject.bind(this) }),
                                            React.createElement(PrimaryButton, { style: {
                                                    display: this.state.flowApproval ? "block" : "none",
                                                    backgroundColor: "#425C68",
                                                    border: "transparent"
                                                }, text: "Asignar flujo", allowDisabledFocus: true, onClick: null }),
                                            React.createElement(PrimaryButton, { style: {
                                                    display: (this.state.viewModel.ShowEvidenceButton
                                                        && entity.EvidenceHasChanges()
                                                        && this.state.enableSubmit)
                                                        ? "block" : "none",
                                                    backgroundColor: "#425C68",
                                                    border: "transparent"
                                                }, text: "Actualizar evidencia", allowDisabledFocus: true, onClick: this.updateEvidence.bind(this) }))))))));
        }
        if (this.state.formSubmitted) {
            output =
                React.createElement(PromoFormResult, { title: this.props.title, close: this.props.close, message: this.state.resultIsOK ? 'La operación se completó correctamente.' : 'Error al ejecutar la operación: ' + this.state.errorMessage, isSuccess: this.state.resultIsOK });
        }
        return output;
    };
    //#region Header events
    PromoForm.prototype.onCloseModal = function () {
        if (!this.state.viewModel.ReadOnlyForm)
            this.setState({ hideModalConfirmationDialog: false });
        else
            this.props.close();
    };
    PromoForm.prototype.onNameChange = function (_event, text) {
        var client = this.state.viewModel.Entity.Client;
        this.setState(function (state) {
            var newState = state;
            newState.promotionTitle = client && text ? client.Name + " - " + text : "Nueva promoción";
            newState.viewModel.Entity.Name = text;
            return newState;
        });
    };
    PromoForm.prototype.onActivityObjectiveChange = function (_event, text) {
        this.setState(function (state) {
            state.viewModel.Entity.ActivityObjective = text;
            return state;
        });
    };
    PromoForm.prototype.onClientChanged = function (item) {
        var _this = this;
        var clientId = item.key;
        this.setState(function (state) {
            state.viewModel.Entity.Client = new Client({ ItemId: clientId, Name: item.text });
            return state;
        }, function () {
            _this.state.viewModel.Entity.Items.map(function (promoitem, index) {
                _this.updateClientProductFields(index);
            });
        });
        ClientRepository.GetById(clientId).then(function (client) {
            _this.setState(function (state) {
                var newState = state;
                newState.viewModel.Entity.Client = client;
                return newState;
            });
        });
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].ClientProduct = null;
            state.viewModel.Entity.Items[_this.state.selectedIndex].Client = item.key ? new LookupValue({
                ItemId: item.key,
                Value: item.text
            }) : null;
            return state;
        });
    };
    //#endregion
    //#region Tabs
    PromoForm.prototype.AddPromoItem = function () {
        var items = this.state.viewModel.Entity.Items;
        var index = items.length + 1;
        /*items.push(new PromoItem({
          AdditionalID: this.state.viewModel.Entity.PromoID + "." + index,
          GetBaseGMSum: this.state.viewModel.Entity.GetBaseGMSum.bind(this.state.viewModel.Entity)
        }));*/
        items.push(new PromoItem({
            AdditionalID: this.state.viewModel.Entity.PromoID + "." + index,
            GetBaseGMSum: this.state.viewModel.Entity.GetBaseGMSum.bind(this.state.viewModel.Entity),
            ShortDescription: "",
            Category: items[this.state.selectedIndex].Category,
            Investment: null,
            Type: items[this.state.selectedIndex].Type,
            CappedActivity: items[this.state.selectedIndex].CappedActivity,
            BusinessUnit: items[this.state.selectedIndex].BusinessUnit,
            Brand: null,
            ProductCategory: items[this.state.selectedIndex].ProductCategory,
            ClientProduct: null,
            //Product: null,
            StartDate: items[this.state.selectedIndex].StartDate,
            EndDate: items[this.state.selectedIndex].EndDate,
            DiscountPerPiece: null,
            NetPrice: items[this.state.selectedIndex].NetPrice,
            COGS: items[this.state.selectedIndex].COGS,
            Redemption: null,
            BaseVolume: null,
            EstimatedIncrementalVolume: null,
            AdditionalInvestment: null
        }));
        this.setState(function (state) {
            var newState = state;
            newState.viewModel.Entity.Items = items;
            newState.selectedIndex = items.length - 1;
            return newState;
        });
    };
    PromoForm.prototype.RemovePromoItem = function () {
        var _this = this;
        var items = this.state.viewModel.Entity.Items;
        items.splice(this.state.selectedIndex, 1);
        items.map(function (item, index) {
            item.AdditionalID = _this.state.viewModel.Entity.PromoID + "." + (index + 1);
        });
        this.setState(function (state) {
            var newState = state;
            newState.viewModel.Entity.Items = items;
            newState.selectedIndex = 0;
            newState.hideDeleteProductDialog = true;
            return newState;
        });
    };
    PromoForm.prototype.onTabLinkClicked = function (item) {
        if (item.props.itemKey == "ADD") {
            this.AddPromoItem();
        }
        else {
            this.changeSelectedItem(parseInt(item.props.itemKey));
        }
    };
    PromoForm.prototype.changeSelectedItem = function (index) {
        var _this = this;
        this.setState({
            selectedIndex: index,
            loadingTypes: true
        });
        var category = this.state.viewModel.Entity.Items[index].Category;
        if (category != null) {
            PromoService.GetTypesByCategory(category.ItemId).then(function (types) {
                _this.setState({ loadingTypes: false });
                _this.setState(function (state) {
                    state.viewModel.Types = types;
                    return state;
                });
            });
        }
    };
    //#endregion
    //#region Promo item - General
    PromoForm.prototype.onShortDescriptionChange = function (_event, text) {
        var _this = this;
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].ShortDescription = text;
            return state;
        });
    };
    PromoForm.prototype.onCategoryChanged = function (item) {
        var _this = this;
        var promoItem = this.state.viewModel.Entity.Items[this.state.selectedIndex];
        promoItem.Category = this.state.viewModel.Categories.filter(function (x) { return x.ItemId === item.key; })[0];
        promoItem.Type = null;
        promoItem.Redemption = null;
        if (!promoItem.RequiresInvestment())
            promoItem.Investment = null;
        if (!promoItem.RequiresDiscountPerPiece())
            promoItem.DiscountPerPiece = null;
        this.setState(function (prevState) {
            var newState = prevState;
            newState.loadingTypes = true;
            newState.viewModel.Entity.Items[_this.state.selectedIndex] = promoItem;
            return newState;
        }, function () {
            _this.updateClientProductFields(_this.state.selectedIndex);
        });
        PromoService.GetTypesByCategory(promoItem.Category.ItemId).then(function (types) {
            _this.setState(function (state) {
                var newState = state;
                newState.loadingTypes = false;
                newState.viewModel.Types = types;
                return newState;
            });
        });
    };
    PromoForm.prototype.onInvestmentChange = function (_event, text) {
        var _this = this;
        if (CommonHelper.IsNullOrEmpty(text) || CommonHelper.isValidDecimal(text, 2)) {
            this.setState(function (state) {
                state.viewModel.Entity.Items[_this.state.selectedIndex].Investment = !isNaN(parseFloat(text)) ? parseFloat(text) : null;
                return state;
            });
        }
    };
    PromoForm.prototype.onTypeChanged = function (item) {
        var _this = this;
        var promoItem = this.state.viewModel.Entity.Items[this.state.selectedIndex];
        promoItem.Type = this.state.viewModel.Types.filter(function (x) { return x.ItemId === item.key; })[0];
        promoItem.Redemption = null;
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex] = promoItem;
            return state;
        });
    };
    PromoForm.prototype.onCappedActivityChanged = function (_ev, checked) {
        var _this = this;
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].CappedActivity = checked;
            return state;
        });
    };
    //#endregion
    //#region Promo item - Product
    PromoForm.prototype.GetFilteredCLients = function () {
        var filteresClients = [];
        var map = new Map();
        for (var _i = 0, _a = this.GetFilteredProducts().map(function (p) { return p.Client; }); _i < _a.length; _i++) {
            var item = _a[_i];
            if (!map.has(item.ItemId)) {
                map.set(item.ItemId, true);
                filteresClients.push(item);
            }
        }
        filteresClients.sort(function (a, b) { return a.Value > b.Value ? 1 : -1; });
        return filteresClients;
    };
    /*private GetFilteredProducts(): Product[] {
      const selectedItem = this.state.viewModel.Entity.Items[this.state.selectedIndex];
      let filteredProducts = this.state.viewModel.Products || [];
  
      if (selectedItem.BusinessUnit)
        filteredProducts = filteredProducts.filter(x => x.BusinessUnit.ItemId === selectedItem.BusinessUnit.ItemId);
  
      if (selectedItem.Brand)
        filteredProducts = filteredProducts.filter(x => x.Brand.ItemId === selectedItem.Brand.ItemId);
  
      if (selectedItem.ProductCategory)
        filteredProducts = filteredProducts.filter(x => x.Category.ItemId === selectedItem.Category.ItemId);
  
      return filteredProducts;
    }*/
    PromoForm.prototype.GetFilteredProducts = function () {
        var selectedItem = this.state.viewModel.Entity.Items[this.state.selectedIndex];
        var filteredProducts = this.state.viewModel.ClientProducts || [];
        if (selectedItem.Client)
            filteredProducts = filteredProducts.filter(function (x) { return x.Client.ItemId === selectedItem.Client.ItemId; });
        if (selectedItem.BusinessUnit)
            filteredProducts = filteredProducts.filter(function (x) { return x.BusinessUnit.ItemId === selectedItem.BusinessUnit.ItemId; });
        if (selectedItem.Brand)
            filteredProducts = filteredProducts.filter(function (x) { return x.Brand.ItemId === selectedItem.Brand.ItemId; });
        if (selectedItem.ProductCategory)
            filteredProducts = filteredProducts.filter(function (x) { return x.Category.ItemId === selectedItem.ProductCategory.ItemId; });
        return filteredProducts;
    };
    PromoForm.prototype.GetFilteredBrands = function () {
        var filteredBrands = [];
        var map = new Map();
        for (var _i = 0, _a = this.GetFilteredProducts().map(function (p) { return p.Brand; }); _i < _a.length; _i++) {
            var item = _a[_i];
            if (!map.has(item.ItemId)) {
                map.set(item.ItemId, true);
                filteredBrands.push(item);
            }
        }
        filteredBrands.sort(function (a, b) { return a.Value > b.Value ? 1 : -1; });
        if (this.state.viewModel.Entity.Items[this.state.selectedIndex].Brand != null)
            filteredBrands.unshift(new LookupValue({ Value: Constants.Miscellaneous.ClearSelectionText }));
        return filteredBrands;
    };
    PromoForm.prototype.GetFilteredBUs = function () {
        var filteredBUs = [];
        var map = new Map();
        for (var _i = 0, _a = this.GetFilteredProducts().map(function (p) { return p.BusinessUnit; }); _i < _a.length; _i++) {
            var item = _a[_i];
            if (!map.has(item.ItemId)) {
                map.set(item.ItemId, true);
                filteredBUs.push(item);
            }
        }
        filteredBUs.sort(function (a, b) { return a.Value > b.Value ? 1 : -1; });
        if (this.state.viewModel.Entity.Items[this.state.selectedIndex].BusinessUnit != null)
            filteredBUs.unshift(new LookupValue({ Value: Constants.Miscellaneous.ClearSelectionText }));
        return filteredBUs;
    };
    PromoForm.prototype.GetFilteredProductCategories = function () {
        var filteredCategories = [];
        var map = new Map();
        for (var _i = 0, _a = this.GetFilteredProducts().map(function (p) { return p.Category; }); _i < _a.length; _i++) {
            var item = _a[_i];
            if (!map.has(item.ItemId)) {
                map.set(item.ItemId, true);
                filteredCategories.push(item);
            }
        }
        filteredCategories.sort(function (a, b) { return a.Value > b.Value ? 1 : -1; });
        if (this.state.viewModel.Entity.Items[this.state.selectedIndex].ProductCategory != null)
            filteredCategories.unshift(new LookupValue({ Value: Constants.Miscellaneous.ClearSelectionText }));
        return filteredCategories;
    };
    PromoForm.prototype.onBusinessUnitChanged = function (item) {
        var _this = this;
        console.log(item.text);
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].ClientProduct = null;
            state.viewModel.Entity.Items[_this.state.selectedIndex].BusinessUnit = item.key ? new LookupValue({
                ItemId: item.key,
                Value: item.text
            }) : null;
            return state;
        });
    };
    PromoForm.prototype.onBrandChanged = function (item) {
        var _this = this;
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].ClientProduct = null;
            state.viewModel.Entity.Items[_this.state.selectedIndex].Brand = item.key ? new LookupValue({
                ItemId: item.key,
                Value: item.text
            }) : null;
            return state;
        });
    };
    PromoForm.prototype.onProductCategoryChanged = function (item) {
        var _this = this;
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].ClientProduct = null;
            state.viewModel.Entity.Items[_this.state.selectedIndex].ProductCategory = item.key ? new LookupValue({
                ItemId: item.key,
                Value: item.text
            }) : null;
            return state;
        });
    };
    PromoForm.prototype.onProductChanged = function (productId) {
        var _this = this;
        var product = this.state.viewModel.ClientProducts.filter(function (x) { return x.ItemId === productId; })[0];
        //console.log(product, product.SKUNumber);
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].ClientProduct = product;
            //state.viewModel.Entity.Items[this.state.selectedIndex].Client = product.Client;
            state.viewModel.Entity.Items[_this.state.selectedIndex].BusinessUnit = product.BusinessUnit;
            state.viewModel.Entity.Items[_this.state.selectedIndex].Brand = product.Brand;
            state.viewModel.Entity.Items[_this.state.selectedIndex].ProductCategory = product.Category;
            return state;
        }, function () {
            _this.updateClientProductFields(_this.state.selectedIndex);
        });
    };
    PromoForm.prototype.onSelectStartDate = function (date) {
        var _this = this;
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].StartDate = date;
            return state;
        });
    };
    PromoForm.prototype.onSelectEndDate = function (date) {
        var _this = this;
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].EndDate = date;
            return state;
        });
    };
    PromoForm.prototype.updateClientProductFields = function (itemIndex) {
        var _this = this;
        var promoItem = this.state.viewModel.Entity.Items[itemIndex];
        var client = this.state.viewModel.Entity.Client;
        //const product = promoItem.Product;
        var product = promoItem.ClientProduct;
        var skunumber = promoItem.ClientProduct;
        if (client && product) {
            ClientProductRepository.GetByClientAndProduct(client.ItemId, skunumber.SKUNumber).then(function (item) {
                promoItem.NetPrice = promoItem.RequiresNetPrice() && item ? item.Price : null;
                promoItem.COGS = item ? item.COGS : null;
                _this.setState(function (state) {
                    state.viewModel.Entity.Items[itemIndex] = promoItem;
                    return state;
                });
            });
            LastYearVolumesRepository.GetByClientAndProduct(client.ItemId, product.ItemId).then(function (item) {
                _this.setState(function (state) {
                    state.viewModel.Entity.Items[itemIndex].LastYearVolumes = item;
                    return state;
                });
            });
        }
        else {
            promoItem.NetPrice = null;
            promoItem.COGS = null;
            this.setState(function (state) {
                state.viewModel.Entity.Items[itemIndex] = promoItem;
                return state;
            });
        }
    };
    //#endregion
    //#region Input - Pre analisis
    PromoForm.prototype.onDiscountPerPieceChange = function (_event, text) {
        var _this = this;
        if (CommonHelper.IsNullOrEmpty(text) || CommonHelper.isValidDecimal(text, 2)) {
            this.setState(function (state) {
                state.viewModel.Entity.Items[_this.state.selectedIndex].DiscountPerPiece = !isNaN(parseFloat(text)) ? parseFloat(text) : null;
                return state;
            });
        }
    };
    PromoForm.prototype.onRedemptionChange = function (_event, text) {
        var _this = this;
        if (CommonHelper.IsNullOrEmpty(text) || CommonHelper.isValidDecimal(text, 2)) {
            this.setState(function (state) {
                state.viewModel.Entity.Items[_this.state.selectedIndex].Redemption = !isNaN(parseFloat(text)) ? parseFloat(text) : null;
                return state;
            });
        }
    };
    PromoForm.prototype.onBaseVolumeChange = function (_event, text) {
        var _this = this;
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].BaseVolume = !isNaN(parseInt(text)) ? parseInt(text) : null;
            return state;
        });
    };
    PromoForm.prototype.onAdditionalInvestmentChange = function (_event, text) {
        var _this = this;
        if (CommonHelper.IsNullOrEmpty(text) || CommonHelper.isValidDecimal(text, 2)) {
            this.setState(function (state) {
                state.viewModel.Entity.Items[_this.state.selectedIndex].AdditionalInvestment = !isNaN(parseFloat(text)) ? parseFloat(text) : null;
                return state;
            });
        }
    };
    PromoForm.prototype.onEstimatedIncrementalVolumeChange = function (_event, text) {
        var _this = this;
        this.setState(function (state) {
            state.viewModel.Entity.Items[_this.state.selectedIndex].EstimatedIncrementalVolume = !isNaN(parseInt(text)) ? parseInt(text) : null;
            return state;
        });
    };
    //#endregion
    //#region  Evidencias
    PromoForm.prototype.onFileChanged = function (event) {
        var _this = this;
        var self = this;
        var promoEvidence = this.state.viewModel.Entity.Evidence;
        if (event.target && event.target.files[0]) {
            var file_1 = event.target.files[0];
            var reader = new FileReader();
            reader.addEventListener("loadend", function () {
                var evidence = new PromoEvidence();
                var fileExists = false;
                promoEvidence.map(function (ev) {
                    if (ev.FileName == file_1.name) {
                        fileExists = true;
                        return;
                    }
                });
                if (!fileExists) {
                    evidence.File = file_1;
                    evidence.FileName = file_1.name;
                    evidence.Description = _this.state.evidenceDescription;
                    evidence.Date = _this.state.evidenceDate;
                    promoEvidence.push(evidence);
                    _this.setState(function (state) {
                        state.viewModel.Entity.Evidence = promoEvidence;
                        return state;
                    });
                }
                else {
                    _this.setState({ hideFileExistsMessageDialog: false });
                }
                document.getElementById("evidence_file_input").value = "";
            });
            reader.readAsDataURL(file_1);
        }
    };
    PromoForm.prototype.onEvidenceDescriptionChange = function (_event, text) {
        this.setState({
            evidenceDescription: text
        });
    };
    PromoForm.prototype.onSelectEvidenceDate = function (date) {
        this.setState({
            evidenceDate: date
        });
    };
    PromoForm.prototype.updateEvidence = function () {
        var _this = this;
        var entity = this.state.viewModel.Entity;
        this.setState({
            enableSubmit: false,
            hideSavingSpinnerConfirmationDialog: false
        });
        PromoService.UpdateEvidence(entity.PromoID, entity.Evidence).then(function () {
            _this.setState({
                formSubmitted: true,
                resultIsOK: true
            });
        }).catch(function (err) {
            console.error(err);
            _this.setState({ formSubmitted: true, errorMessage: err });
        });
    };
    //#endregion
    //#region Actions
    PromoForm.prototype.Proven = function () {
        var _this = this;
        this.setState({
            enableSubmit: false,
            hideActionConfirmationDialog: true,
            hideSavingSpinnerConfirmationDialog: false
        });
        var dato = this.state.viewModel.Entity;
        dato.ChangeState(PromoStatus.Proven);
        PromoService.Proven(dato, this.state.actionsComments).then(function () {
            _this.setState({
                formSubmitted: true,
                resultIsOK: true,
            });
        }).catch(function (err) {
            console.error(err);
            _this.setState({ formSubmitted: true, errorMessage: err });
        });
    };
    PromoForm.prototype.copyPromo = function () {
        var _this = this;
        if (!this.validateFormControls())
            return;
        this.setState({
            enableSubmit: false,
            hideSavingSpinnerConfirmationDialog: false
        });
        var dato = this.state.viewModel.Entity;
        dato.ChangeState(PromoStatus.New);
        dato.ItemId = undefined;
        dato.Items.map(function (item) {
            item.ItemId = null;
            item.AdditionalID = "--" + "." + item.AdditionalID.split('.')[1];
            item.StartDate = undefined;
            item.EndDate = undefined;
        });
        PromoService.Save(dato).then(function () {
            _this.setState({
                formSubmitted: true,
                resultIsOK: true
            });
        }).catch(function (err) {
            console.error(err);
            _this.setState({ formSubmitted: true, errorMessage: err });
        });
    };
    PromoForm.prototype.save = function () {
        var _this = this;
        if (!this.validateFormControls())
            return;
        this.setState({
            enableSubmit: false,
            hideSavingSpinnerConfirmationDialog: false
        });
        PromoService.Save(this.state.viewModel.Entity).then(function () {
            _this.setState({
                formSubmitted: true,
                resultIsOK: true
            });
        }).catch(function (err) {
            console.error(err);
            _this.setState({ formSubmitted: true, errorMessage: err });
        });
    };
    PromoForm.prototype.submit = function () {
        var _this = this;
        if (!this.validateFormControls())
            return;
        this.setState({
            enableSubmit: false,
            hideSavingSpinnerConfirmationDialog: false
        });
        PromoService.Submit(this.state.viewModel.Entity).then(function () {
            _this.setState({
                formSubmitted: true,
                resultIsOK: true
            });
        }).catch(function (err) {
            console.error(err);
            _this.setState({ formSubmitted: true, errorMessage: err });
        });
    };
    PromoForm.prototype.approve = function () {
        this.setState({
            actionConfirmationDialogTitle: "Aprobar",
            actionConfirmationDialogType: ActionConfirmationType.Approve,
            hideActionConfirmationDialog: false
        });
    };
    PromoForm.prototype.reject = function () {
        this.setState({
            actionConfirmationDialogTitle: "Rechazar",
            actionConfirmationDialogType: ActionConfirmationType.Reject,
            hideActionConfirmationDialog: false
        });
    };
    PromoForm.prototype.onActionCommentsChange = function (_event, text) {
        this.setState({ actionsComments: text });
    };
    PromoForm.prototype.confirmAction = function () {
        var _this = this;
        if (this.state.actionConfirmationDialogType == ActionConfirmationType.Approve) {
            this.setState({
                enableSubmit: false,
                hideActionConfirmationDialog: true,
                hideSavingSpinnerConfirmationDialog: false
            });
            PromoService.Approve(this.state.viewModel.Entity, this.state.actionsComments).then(function () {
                _this.setState({
                    formSubmitted: true,
                    resultIsOK: true
                });
            }).catch(function (err) {
                console.error(err);
                _this.setState({ formSubmitted: true, errorMessage: err });
            });
        }
        else {
            this.setState({ enableActionValidation: true });
            if (!CommonHelper.IsNullOrEmpty(this.state.actionsComments)) {
                this.setState({
                    enableSubmit: false,
                    hideActionConfirmationDialog: true,
                    hideSavingSpinnerConfirmationDialog: false
                });
                PromoService.Reject(this.state.viewModel.Entity, this.state.actionsComments).then(function () {
                    _this.setState({
                        formSubmitted: true,
                        resultIsOK: true
                    });
                }).catch(function (err) {
                    console.error(err);
                    _this.setState({ formSubmitted: true, errorMessage: err });
                });
            }
            else
                return;
        }
    };
    //#endregion
    PromoForm.prototype.getValidationErrorMessage = function (value) {
        if (value == undefined)
            return this.state.hasValidationError ? Constants.Messages.RequiredField : CommonHelper.EmptyString;
        if (typeof value === "string")
            return this.state.hasValidationError && CommonHelper.IsNullOrEmpty(value) ? Constants.Messages.RequiredField : CommonHelper.EmptyString;
        if (CommonHelper.IsArray(value))
            return this.state.hasValidationError && value.length == 0 ? Constants.Messages.RequiredField : CommonHelper.EmptyString;
        return CommonHelper.EmptyString;
    };
    PromoForm.prototype.validateFormControls = function () {
        var invalidCount = 0;
        if (CommonHelper.IsNullOrEmpty(this.state.viewModel.Entity.ActivityObjective))
            invalidCount++;
        if (this.state.viewModel.Entity.Client == null)
            invalidCount++;
        this.state.viewModel.Entity.Items.map(function (item) {
            if (!item.IsValid())
                invalidCount++;
        });
        this.setState({ hasValidationError: invalidCount > 0 });
        return invalidCount == 0;
    };
    PromoForm.prototype.validateEvidence = function () {
        var invalidCount = 0;
        if (CommonHelper.IsNullOrEmpty(this.state.evidenceDescription))
            invalidCount++;
        if (!CommonHelper.IsDate(this.state.evidenceDate))
            invalidCount++;
        this.setState({ hasEvidenceValidatioNError: invalidCount > 0 });
        return invalidCount == 0;
    };
    PromoForm.prototype.getEvidenceValidationErrorMessage = function (value) {
        if (value == undefined)
            return this.state.hasEvidenceValidatioNError ? Constants.Messages.RequiredField : CommonHelper.EmptyString;
        if (typeof value === "string")
            return this.state.hasEvidenceValidatioNError && CommonHelper.IsNullOrEmpty(value) ? Constants.Messages.RequiredField : CommonHelper.EmptyString;
        if (CommonHelper.IsArray(value))
            return this.state.hasEvidenceValidatioNError && value.length == 0 ? Constants.Messages.RequiredField : CommonHelper.EmptyString;
        return CommonHelper.EmptyString;
    };
    PromoForm.prototype._customPromotionPivotItemRenderer = function (promoID, link, defaultRenderer) {
        return (React.createElement(Stack, { horizontal: true },
            defaultRenderer(link),
            React.createElement(Label, { style: { color: theme.palette.themePrimary } },
                React.createElement(Icon, { iconName: "DietPlanNotebook" })),
            React.createElement(Label, null, "ID Promoci\u00F3n\u00A0:\u00A0"),
            React.createElement(Label, { style: { color: theme.palette.themePrimary, fontWeight: "bold" } }, promoID)));
    };
    PromoForm.prototype._customPromotionSummaryPivotItemRenderer = function (link, defaultRenderer) {
        return (React.createElement(Stack, { horizontal: true },
            defaultRenderer(link),
            React.createElement(Label, { style: { color: theme.palette.themePrimary } },
                React.createElement(Icon, { iconName: "DietPlanNotebook" })),
            React.createElement(Label, null, "Resumen General")));
    };
    PromoForm.prototype._customPromotionEvidencePivotItemRenderer = function (link, defaultRenderer) {
        return (React.createElement(Stack, { horizontal: true, hidden: true },
            defaultRenderer(link),
            React.createElement(Label, { style: { color: theme.palette.themePrimary } },
                React.createElement(Icon, { iconName: "Attach" })),
            React.createElement(Label, null, "Evidencias")));
    };
    return PromoForm;
}(React.Component));
export { PromoForm };
//# sourceMappingURL=PromoForm.js.map