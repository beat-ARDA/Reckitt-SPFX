import { Entity, LookupValue } from "../../infrastructure";
export declare class WorkflowLog extends Entity {
    DateAndTime: Date;
    User: LookupValue;
    Action: string;
    Comments: string;
    constructor(init?: Partial<WorkflowLog>);
    DateAndTimeAsString(): string;
}
//# sourceMappingURL=WorkflowLog.d.ts.map