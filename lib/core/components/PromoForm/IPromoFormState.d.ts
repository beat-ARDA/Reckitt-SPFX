import { ActionConfirmationType } from "../../infrastructure";
import { ClientProduct } from "../../model/Common";
import { PromoViewModel } from "../../model/Promo/PromoViewModel";
export interface IPromoFormState {
    isLoading: boolean;
    hasValidationError: boolean;
    enableSubmit: boolean;
    formSubmitted: boolean;
    resultIsOK: boolean;
    viewModel?: PromoViewModel;
    errorMessage?: string;
    selectedIndex: number;
    loadingTypes: boolean;
    filteredProducts: ClientProduct[];
    actionsComments?: string;
    evidenceDescription?: string;
    evidenceDate?: Date;
    hasEvidenceValidatioNError?: boolean;
    mainModalOpen: boolean;
    hideDeleteProductDialog: boolean;
    hideSavingSpinnerConfirmationDialog: boolean;
    hideModalConfirmationDialog: boolean;
    hideActionConfirmationDialog: boolean;
    hideDeleteEvidenceDialog: boolean;
    hideFileExistsMessageDialog: boolean;
    actionConfirmationDialogTitle?: string;
    actionConfirmationDialogType?: ActionConfirmationType;
    enableActionValidation: boolean;
    promotionTitle: string;
    CopiarPromo: boolean;
    currentUser: String;
    PromoProven: boolean;
}
//# sourceMappingURL=IPromoFormState.d.ts.map