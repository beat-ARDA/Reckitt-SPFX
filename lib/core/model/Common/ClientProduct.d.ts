import { Entity, LookupValue } from "../../infrastructure";
export declare class ClientProduct extends Entity {
    SKUNumber: string;
    SKUDescription: string;
    Product: LookupValue;
    BusinessUnit: LookupValue;
    Category: LookupValue;
    Brand: LookupValue;
    ClientId: number;
    SKUProductId: number;
    Price: number;
    COGS: number;
    Client: LookupValue;
    constructor(init?: Partial<ClientProduct>);
}
//# sourceMappingURL=ClientProduct.d.ts.map