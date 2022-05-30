import { Category, Client, ClientProduct, Type } from "../Common";
import { Promo } from "./Promo";
export declare class PromoViewModel {
    Entity: Promo;
    constructor(entity: Promo);
    ReadOnlyForm: boolean;
    Clients: Client[];
    Categories: Category[];
    Types: Type[];
    ClientProducts: ClientProduct[];
    FlowsTypes: Array<{
        key: number;
        text: string;
    }>;
    GetPromotionTitle(): string;
    ShowSaveButton: boolean;
    ShowSubmitButton: boolean;
    ShowApproveButton: boolean;
    ShowRejectButton: boolean;
    ShowEvidenceButton: boolean;
}
//# sourceMappingURL=PromoViewModel.d.ts.map