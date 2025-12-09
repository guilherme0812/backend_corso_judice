import { z } from 'zod';

export const createPaymentSchema = z.object({
    caseId: z.string(),
    amount: z.number().positive(),
    dueDate: z.string(),
    paidAt: z.string().nullable().optional(),
    status: z.enum(['PENDING', 'PAID', 'LATE']),
});
export type CreatePaymentDTO = z.infer<typeof createPaymentSchema>;

export const payPaymentSchema = z.object({
    id: z.string().uuid(),
});
export type PayPaymentDTO = z.infer<typeof payPaymentSchema>;

export const getPaymentsSchema = z.object({
    caseId: z.string().optional(),
    status: z.enum(['PENDING', 'PAID', 'LATE']).optional(),
    dueDate: z.string().optional(),
    paidAt: z.string().optional(),
    companyId: z.string().optional(),
});
export type GetPaymentsDTO = z.infer<typeof getPaymentsSchema>;

export const getCashFlowSchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    companyId: z.string().uuid().optional(),
});
export type GetCashFlowDTO = z.infer<typeof getCashFlowSchema>;

export const getMonthlyReportSchema = z.object({
    companyId: z.string().optional(),
});
export type GetMonthlyReportDTO = z.infer<typeof getMonthlyReportSchema>;

