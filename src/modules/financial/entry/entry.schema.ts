import { z } from 'zod';

export const getListSchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    companyId: z.string().uuid().optional(),
    limit: z.number().optional(),
});
export type GetListDTO = z.infer<typeof getListSchema>;

export const getSummarySchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    companyId: z.string().uuid().optional(),
});
export type GetSummaryDTO = z.infer<typeof getSummarySchema>;

export const payPaymentSchema = z.object({
    id: z.string().uuid(),
});

export const cashFlowSchema = getSummarySchema;

export const createEntryPaymentSchema = z.object({
    type: z.enum(['RECEIVABLE', 'PAYABLE']),
    origin: z.enum(['PAYMENT', 'SPLIT', 'MANUAL', 'CASE']),
    amount: z.number().positive(),
    dueDate: z.string(),
    status: z.enum(['PENDING', 'PAID', 'PARTIAL', 'OVERDUE']),
    categoryId: z.string().uuid().optional(),
});
export type createEntryPaymentDTO = z.infer<typeof createEntryPaymentSchema>;
