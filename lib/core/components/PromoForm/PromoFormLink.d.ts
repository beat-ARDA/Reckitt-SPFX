import * as React from "react";
import { ExtensionContext } from "@microsoft/sp-extension-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IPromoFormLinkProps {
    context: ExtensionContext | WebPartContext;
}
export interface IPromoFormLinkState {
    showButton: boolean;
}
export declare class PromoFormLink extends React.Component<IPromoFormLinkProps, IPromoFormLinkState> {
    constructor(props: IPromoFormLinkProps);
    private banner;
    private mainStakStyles;
    private headerStyles;
    private subHeaderStyles;
    private openPromotionButtonStyles;
    componentDidMount(): void;
    render(): React.ReactElement<IPromoFormLinkProps>;
    private openPromoFormDialog;
}
//# sourceMappingURL=PromoFormLink.d.ts.map