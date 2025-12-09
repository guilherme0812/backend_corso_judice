import { $Enums } from '@prisma/client';

export type CreatePayment = {
    id: string;
    amount: number;
    dueDate: Date;
    paidAt: Date | null;
    status: $Enums.PaymentStatus;
    caseId: string;
};

export type PaymentGenericParams = {
    caseId?: string;
    status?: $Enums.PaymentStatus;
    dueDate?: string;
    paidAt?: string;
};
