import { z } from 'zod';

export const createPaymentSchema = z.object({
    caseId: z.string(),
    amount: z.number().positive(),
    dueDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
    }),
});
