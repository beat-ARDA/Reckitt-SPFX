import * as React from 'react';
import { ClientProduct } from "../../model/Common";
interface IProductSelectorProps {
    clientProducts: ClientProduct[];
    onChanged: (product: ClientProduct) => void;
    value: ClientProduct;
    errorMessage: string;
    required: boolean;
    isDisabled: boolean;
}
export declare class ProductSelector extends React.Component<IProductSelectorProps, {}> {
    constructor(props: IProductSelectorProps);
    render(): React.ReactElement<IProductSelectorProps>;
    private onChange;
}
export {};
//# sourceMappingURL=ProductSelector.d.ts.map