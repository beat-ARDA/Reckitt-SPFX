import { FieldCustomizerContext } from '@microsoft/sp-listview-extensibility';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import '../GlobalVariables';
export declare class CommonHelper {
    static EmptyString: string;
    static IsNullOrEmpty(value: string): boolean;
    static IsArray(v: any): v is Array<any>;
    static IsDate(v: any): v is Date;
    static getParameterByName(name: string, url?: string): string;
    static formatDate(date?: Date): string;
    static replaceAll(str: string, searchValue: string, replaceValue: string): string;
    static ensurePnPJs(context: WebPartContext | FieldCustomizerContext): void;
    static getDecimal(value: any, decimals: number): number;
    static isValidDecimal(value: string, decimals: number): boolean;
}
//# sourceMappingURL=CommonHelper.d.ts.map