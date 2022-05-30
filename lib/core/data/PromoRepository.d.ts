import { Promo } from "../model/Promo/Promo";
export declare class PromoRepository {
    static LIST_NAME: string;
    static GetById(id: number): Promise<Promo>;
    static SaveOrUpdate(entity: Promo, sU?: number): Promise<void>;
    static GetNewPromo(): Promise<Promo>;
    private static BuildEntity;
}
//# sourceMappingURL=PromoRepository.d.ts.map