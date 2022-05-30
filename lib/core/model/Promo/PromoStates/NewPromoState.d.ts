import { Promo } from "..";
import { PromoViewModel } from "../PromoViewModel";
import { PromoState } from "./PromoState";
export declare class NewPromoState extends PromoState {
    GetStatusId(): number;
    GetStatusText(): string;
    GetViewModel(): Promise<PromoViewModel>;
    Save(entity: Promo): Promise<void>;
    Submit(entity: Promo): Promise<void>;
}
//# sourceMappingURL=NewPromoState.d.ts.map