import * as React from 'react';
import { IPromoFormProps, IPromoFormState } from '.';
export declare class PromoForm extends React.Component<IPromoFormProps, IPromoFormState> {
    constructor(props: IPromoFormProps);
    GetUser(): Promise<void>;
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<IPromoFormProps>;
    private onCloseModal;
    private onNameChange;
    private onActivityObjectiveChange;
    private onClientChanged;
    private AddPromoItem;
    private RemovePromoItem;
    private onTabLinkClicked;
    private changeSelectedItem;
    private onShortDescriptionChange;
    private onCategoryChanged;
    private onInvestmentChange;
    private onTypeChanged;
    private onCappedActivityChanged;
    private GetFilteredCLients;
    private GetFilteredProducts;
    private GetFilteredBrands;
    private GetFilteredBUs;
    private GetFilteredProductCategories;
    private onBusinessUnitChanged;
    private onBrandChanged;
    private onFlowChange;
    private onProductCategoryChanged;
    private onProductChanged;
    private onSelectStartDate;
    private onSelectEndDate;
    private updateClientProductFields;
    private onDiscountPerPieceChange;
    private onRedemptionChange;
    private onBaseVolumeChange;
    private onAdditionalInvestmentChange;
    private onEstimatedIncrementalVolumeChange;
    private onFileChanged;
    private onEvidenceDescriptionChange;
    private onSelectEvidenceDate;
    private updateEvidence;
    Proven(): void;
    private copyPromo;
    private save;
    private submit;
    private approve;
    private reject;
    private flowAsign;
    private onActionCommentsChange;
    private confirmAction;
    private getValidationErrorMessage;
    private validateFormControls;
    private validateEvidence;
    private getEvidenceValidationErrorMessage;
    private _getShimmerStyles;
    private contentStyles;
    private cancelIcon;
    private iconButtonStyles;
    private repetitiveSectionStyle;
    private confirmationDialogStyles;
    private _customPromotionPivotItemRenderer;
    private _customPromotionSummaryPivotItemRenderer;
    private _customPromotionEvidencePivotItemRenderer;
    private wrapperClass;
    private getCustomShimmerElementsGroup;
    private deleteProductDialogContentProps;
    private deleteEvidenceDialogContentProps;
    private fileExistsDialogContentProps;
    private closeModalDialogContentProps;
    private savingSpinnerModalDialogContentProps;
}
//# sourceMappingURL=PromoForm.d.ts.map