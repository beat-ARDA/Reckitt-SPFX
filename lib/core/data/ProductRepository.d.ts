import { Product } from "../model/Common";
export declare class ProductRepository {
    private static LIST_NAME;
    static GetById(id: number): Promise<Product>;
    static GetAll(): Promise<Product[]>;
    private static BuildEntity;
}
//# sourceMappingURL=ProductRepository.d.ts.map