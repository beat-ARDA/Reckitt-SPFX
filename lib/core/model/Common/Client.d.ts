import { Entity, LookupValue } from "../../infrastructure";
import { Channel } from "./Channel";
export declare class Client extends Entity {
    Name: string;
    Channel: Channel;
    Subchannel: LookupValue;
    KeyAccountManager: LookupValue;
    constructor(init?: Partial<Client>);
}
//# sourceMappingURL=Client.d.ts.map