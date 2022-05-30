import { Client } from "../model/Common";
export declare class ClientRepository {
    private static LIST_NAME;
    static GetById(id: number): Promise<Client>;
    static GetClients(): Promise<Client[]>;
    static UserIsKAM(kamUserId: number): Promise<boolean>;
    private static BuildEntity;
}
//# sourceMappingURL=ClientRepository.d.ts.map