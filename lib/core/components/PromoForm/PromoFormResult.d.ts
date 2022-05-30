import * as React from 'react';
export interface IPromoFormResultResultProps {
    title: string;
    message: string;
    isSuccess: boolean;
    close: () => void;
    successMessageTimeout?: number;
}
export declare class PromoFormResult extends React.Component<IPromoFormResultResultProps, {}> {
    constructor(props: IPromoFormResultResultProps);
    render(): React.ReactElement<IPromoFormResultResultProps>;
    componentDidMount(): void;
    private timeoutClose;
}
//# sourceMappingURL=PromoFormResult.d.ts.map