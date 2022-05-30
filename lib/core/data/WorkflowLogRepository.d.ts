import { WorkflowLog } from "../model/Common/WorkflowLog";
import { Promo } from "../model/Promo/Promo";
export declare class WorkflowLogRepository {
    private static LIST_NAME;
    static GetByPromo(promoId: number): Promise<WorkflowLog[]>;
    static Save(promoItemId: number, promoID: string, action: string, comments: string, entity: Promo): Promise<void>;
    private static BuildEntity;
}
//# sourceMappingURL=WorkflowLogRepository.d.ts.map