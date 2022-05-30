import { Entity, LookupValue } from "../../infrastructure";
export declare class Product extends Entity {
    SKUNumber: string;
    SKUDescription: string;
    BusinessUnit: LookupValue;
    Category: LookupValue;
    Brand: LookupValue;
    constructor(init?: Partial<Product>);
}
//# sourceMappingURL=Product.d.ts.map