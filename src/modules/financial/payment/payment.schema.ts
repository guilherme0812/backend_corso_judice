import { z } from 'zod';

export const createPaymentSchema = z.object({
    caseId: z.string(),
    amount: z.number().positive(),
    dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
});

export const getAllSchema = z.object({
    status: z.enum(['PENDING', 'PAID', 'LATE']).optional(),
    companyId: z.string().optional(),
    startDueDate: z.string().optional(),
    endDueDate: z.string().optional(),
    caseId: z.string().optional(),
});

export type GetAllParamsDTO = z.infer<typeof getAllSchema>;
