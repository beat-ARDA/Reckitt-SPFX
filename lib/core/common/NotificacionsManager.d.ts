import { Promo } from "../model/Promo";
export declare class NotificacionsManager {
    static SendWorkflowStartedNotification(entity: Promo, to: string, cc?: string): Promise<void>;
    static SendTaskAssignedNotification(entity: Promo, to: string, cc?: string, approver?: string): Promise<void>;
    static SendTaskRejectedNotification(entity: Promo, comments: string, rejectedBy: string, to: string, cc?: string): Promise<void>;
    static SendTaskApprovedNotification(entity: Promo, approvedBy: string, to: string, cc?: string): Promise<void>;
    static SendWorkflowApprovedNotification(entity: Promo, to: string, cc?: string): Promise<void>;
    private static SendNotification;
    private static GetReplacementCollection;
    static GetFormattedPromoDate(entity: Promo): string;
    static SendEmail(to: string, cc: string, subject: string, body: string): Promise<void>;
}
//# sourceMappingURL=NotificacionsManager.d.ts.map