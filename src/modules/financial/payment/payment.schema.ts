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
    limit: z.string().optional(),
});

export type GetAllParamsDTO = z.infer<typeof getAllSchema>;


export interface PaymentDataType {
  id: string
  caseId: string
  amount: number
  dueDate: string
  paidAt: any
  status: string
  splits: Split[]
  case: Case
  entries: Entry[]
}

export interface Split {
  id: string
  paymentId: string
  type: string
  amount: number
}

export interface Case {
  title: string
  processNumber: string
  lawyerFee: number
  businessFee: number
  indicatorFee: number
  indicatorId: any
  client: Client
}

export interface Client {
  firstName: string
  lastName: string
}

export interface Entry {
  id: string
  type: string
  status: string
  amount: number
}
