import { UserValue } from "../../infrastructure/UserValue";
export declare class PromoWorkflowState {
    ApproverIDs: number[];
    CompletedBy: number[];
    constructor(approverIDs: number[], completedBy?: number[]);
    IsComplete(): boolean;
    UserCanApprove(userId: number): boolean;
    AddToCompletBy(userId: number): void;
    GetPendingUserIDs(): number[];
    GetPendingUsers(): Promise<UserValue[]>;
}
//# sourceMappingURL=PromoWorkflowState.d.ts.map