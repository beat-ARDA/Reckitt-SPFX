import { Category, Client, ClientProduct, Type, FlowType } from "../Common";
import { Promo } from "./Promo";
export declare class PromoViewModel {
    Entity: Promo;
    constructor(entity: Promo);
    ReadOnlyForm: boolean;
    Clients: Client[];
    Categories: Category[];
    Types: Type[];
    ClientProducts: ClientProduct[];
    FlowsTypes: FlowType[];
    GetPromotionTitle(): string;
    ShowSaveButton: boolean;
    ShowSubmitButton: boolean;
    ShowApproveButton: boolean;
    ShowRejectButton: boolean;
    ShowEvidenceButton: boolean;
}
//# sourceMappingURL=PromoViewModel.d.ts.map