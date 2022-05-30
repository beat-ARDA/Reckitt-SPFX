import { BaseFieldCustomizer, IFieldCustomizerCellEventParameters } from '@microsoft/sp-listview-extensibility';
/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IPromoListViewLinkFieldCustomizerProperties {
    sampleText?: string;
}
export default class PromoListViewLinkFieldCustomizer extends BaseFieldCustomizer<IPromoListViewLinkFieldCustomizerProperties> {
    onInit(): Promise<void>;
    onRenderCell(event: IFieldCustomizerCellEventParameters): void;
    onDisposeCell(event: IFieldCustomizerCellEventParameters): void;
}
//# sourceMappingURL=PromoListViewLinkFieldCustomizer.d.ts.map