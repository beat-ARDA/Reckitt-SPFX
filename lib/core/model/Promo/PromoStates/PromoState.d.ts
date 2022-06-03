import { Promo } from "../Promo";
import { PromoViewModel } from "../PromoViewModel";
import { PromoWorkflowState } from "../PromoWorkflowState";
import { FlowType } from "../../Common";
export declare abstract class PromoState {
    Entity: Promo;
    abstract GetStatusId(): number;
    abstract GetStatusText(): string;
    abstract GetViewModel(): Promise<PromoViewModel>;
    Initialize(): Promise<void>;
    Save(entity: Promo): Promise<void>;
    Submit(entity: Promo): Promise<void>;
    Approve(comments: string): Promise<void>;
    Reject(comments: string): Promise<void>;
    Proven(comments: string): Promise<void>;
    FlowAsign(comments: string, flowType: FlowType): Promise<void>;
    InitializeWorkflowState(entity: Promo): Promise<void>;
    GetCurrentStage(): PromoWorkflowState;
}
//# sourceMappingURL=PromoState.d.ts.map