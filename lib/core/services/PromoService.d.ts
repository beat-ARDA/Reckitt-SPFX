import { Promo } from "../model/Promo/Promo";
import { PromoViewModel } from "../model/Promo/PromoViewModel";
import { Type } from "../model/Common";
import { PromoEvidence } from "../model/Promo/PromoEvidence";
export declare class PromoService {
    private static GetPromo;
    static GetViewModel(itemId?: number): Promise<PromoViewModel>;
    static Save(entity: Promo): Promise<void>;
    static Submit(entity: Promo): Promise<void>;
    static Approve(entity: Promo, comments: string): Promise<void>;
    static Reject(entity: Promo, comments: string): Promise<void>;
    static GetTypesByCategory(categoryId: number): Promise<Type[]>;
    static UpdateEvidence(promoID: string, evidence: PromoEvidence[]): Promise<void>;
    static Proven(entity: Promo, comments: string): Promise<void>;
    static FlowAsign(entity: Promo, comments: string, flowType: string): Promise<void>;
}
//# sourceMappingURL=PromoService.d.ts.map