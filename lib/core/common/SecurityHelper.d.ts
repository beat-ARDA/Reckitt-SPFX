import { LookupValue } from "../infrastructure";
import { UserValue } from "../infrastructure/UserValue";
export declare class SecurityHelper {
    static GetCurrentUser(): Promise<UserValue>;
    static GetUserById(id: number): Promise<UserValue>;
    static GetGroupByName(name: string): Promise<LookupValue>;
    static UserIsMemberOfGroup(userId: number, groupName: string): Promise<boolean>;
    static SetPromoPermissions(itemId: number, readerIDs?: number[], contributorIDs?: number[]): Promise<void>;
}
//# sourceMappingURL=SecurityHelper.d.ts.map