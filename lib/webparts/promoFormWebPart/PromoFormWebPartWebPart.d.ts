import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
export interface IPromoFormWebPartWebPartProps {
    description: string;
}
export default class PromoFormWebPartWebPart extends BaseClientSideWebPart<IPromoFormWebPartWebPartProps> {
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=PromoFormWebPartWebPart.d.ts.map