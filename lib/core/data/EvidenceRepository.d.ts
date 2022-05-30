import { PromoEvidence } from "../model/Promo/PromoEvidence";
export declare class EvidenceRepository {
    static UpdateEvidence(promoID: string, evidence: PromoEvidence[]): Promise<void>;
    static GetByPromoID(promoID: string): Promise<PromoEvidence[]>;
}
//# sourceMappingURL=EvidenceRepository.d.ts.map