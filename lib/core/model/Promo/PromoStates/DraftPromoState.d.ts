import { Promo } from "..";
import { PromoViewModel } from "../PromoViewModel";
import { PromoState } from "./PromoState";
export declare class DraftPromoState extends PromoState {
    Initialize(): Promise<void>;
    GetStatusId(): number;
    GetStatusText(): string;
    GetViewModel(): Promise<PromoViewModel>;
    Save(entity: Promo): Promise<void>;
    Submit(entity: Promo): Promise<void>;
}
//# sourceMappingURL=DraftPromoState.d.ts.map