import { BaseDialog } from '@microsoft/sp-dialog';
import { ExtensionContext } from "@microsoft/sp-extension-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export declare class PromoFormDialog extends BaseDialog {
    title: string;
    itemId?: number;
    context: ExtensionContext | WebPartContext;
    constructor(itemId?: number);
    protected onAfterClose(): void;
    protected render(): void;
    private submit;
}
//# sourceMappingURL=PromoFormDialog.d.ts.map