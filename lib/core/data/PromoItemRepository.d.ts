import { PromoItem } from "../model/Promo";
export declare class PromoItemRepository {
    private static LIST_NAME;
    static GetByPromo(promoId: number, clientId?: number): Promise<PromoItem[]>;
    static SaveOrUpdateItems(promoItemId: number, promoID: string, items: PromoItem[]): Promise<void>;
    private static BuildEntity;
}
//# sourceMappingURL=PromoItemRepository.d.ts.map