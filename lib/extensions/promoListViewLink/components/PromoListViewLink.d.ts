import * as React from 'react';
import { ExtensionContext } from "@microsoft/sp-extension-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IPromoListViewLinkProps {
    itemId: number;
    title: string;
    context: ExtensionContext | WebPartContext;
}
export default class PromoListViewLink extends React.Component<IPromoListViewLinkProps, {}> {
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<{}>;
    private openPromoFormDialog;
}
//# sourceMappingURL=PromoListViewLink.d.ts.map