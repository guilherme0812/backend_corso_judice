import { z } from 'zod';

export const createAttorneySchema = z.object({
    companyId: z.string().uuid().optional(),
    firstName: z.string(),
    lastName: z.string(),
    licenceNumber: z.string(),
    licenceJurisdiction: z.string(),
    licenceCountryCode: z.string(),
    phone: z.string(),
    email: z.string().email(),
    nationality: z.string(),
    maritalStatus: z.string(),
    professionalAddress: z.string(),
});
export type CreateAttorneyDTO = z.infer<typeof createAttorneySchema>;
