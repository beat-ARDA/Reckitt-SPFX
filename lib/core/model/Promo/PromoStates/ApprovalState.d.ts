import { FlowType } from "../../Common";
import { PromoViewModel } from "../PromoViewModel";
import { PromoState } from "./PromoState";
export declare class ApprovalState extends PromoState {
    Initialize(): Promise<void>;
    GetStatusId(): number;
    GetStatusText(): string;
    GetViewModel(): Promise<PromoViewModel>;
    Approve(comments: string): Promise<void>;
    Reject(comments: string): Promise<void>;
    FlowAsign(comments: string, flowType: FlowType): Promise<void>;
}
//# sourceMappingURL=ApprovalState.d.ts.map