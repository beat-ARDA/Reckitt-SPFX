import { PromoViewModel } from "../PromoViewModel";
import { PromoState } from "./PromoState";
export declare class ApprovedState extends PromoState {
    GetStatusId(): number;
    GetStatusText(): string;
    GetViewModel(): Promise<PromoViewModel>;
    Proven(comments: string): Promise<void>;
}
//# sourceMappingURL=ApprovedState.d.ts.map