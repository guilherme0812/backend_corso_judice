import { z } from 'zod';

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
