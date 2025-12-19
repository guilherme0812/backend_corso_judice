export enum PaymentSplitType {
    OFFICE = 'OFFICE',
    LAWYER = 'LAWYER',
    INDICATOR = 'INDICATOR',
}

export type PaymentSplitDataType = {
    id: string;
    paymentId: string;
    type: PaymentSplitType;
    amount: number;
};
