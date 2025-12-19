import { z } from 'zod';

export const getAllCasesSchema = z.object({
    companyId: z.string().uuid().optional(),
    processNumber: z.string().optional(),
    title: z.string().optional(),
    clientName: z.string().optional(),
});
export type GetCasesDTO = z.infer<typeof getAllCasesSchema>;
