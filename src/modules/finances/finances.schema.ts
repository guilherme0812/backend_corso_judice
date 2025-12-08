import { z } from 'zod';

export const createPaymentSchema = z.object({
    caseId: z.string(),
    amount: z.number().positive(),
    dueDate: z.string(),
    paidAt: z.string().nullable().optional(),
    status: z.enum(['PENDING', 'PAID', 'LATE']),
});

export type CreateUserDTO = z.infer<typeof createPaymentSchema>;
