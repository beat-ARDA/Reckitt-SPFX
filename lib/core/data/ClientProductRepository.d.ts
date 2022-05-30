import { ClientProduct } from "../model/Common";
export declare class ClientProductRepository {
    private static LIST_NAME;
    static GetById(id: number): Promise<ClientProduct>;
    static GetByClientAndProduct(clientId: number, skuNumber: string): Promise<ClientProduct>;
    static GetAll(): Promise<ClientProduct[]>;
    private static BuildEntity;
}
//# sourceMappingURL=ClientProductRepository.d.ts.map