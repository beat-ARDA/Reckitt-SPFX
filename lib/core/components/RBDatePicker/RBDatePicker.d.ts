import * as React from 'react';
interface IRBDatePickerProps {
    label: string;
    required: boolean;
    onSelectDate: (date: Date) => void;
    value: Date;
    errorMessage?: string;
    minDate?: Date;
    maxDate?: Date;
}
export declare class RBDatePicker extends React.Component<IRBDatePickerProps, {}> {
    constructor(props: IRBDatePickerProps);
    render(): React.ReactElement<IRBDatePickerProps>;
    private onSelectDate;
}
export {};
//# sourceMappingURL=RBDatePicker.d.ts.map