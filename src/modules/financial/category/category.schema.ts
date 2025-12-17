import z from 'zod';

export enum CategoryType {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE',
}
export type FinancialCategoryDataType = {
    id: string;
    name: string;
    type: CategoryType;
    parentId?: string;
    createdAt: string;
    updatedAt?: string;
};

export const getFinancialCategorySchema = z.object({
    id: z.string().uuid(),
});
export type GetFinancialCategoryDTO = z.infer<typeof getFinancialCategorySchema>;

export const getAllCategorySchema = z.object({
    companyId: z.string().uuid().optional(),
});
export type GetFinancialCategoriesDTO = z.infer<typeof getAllCategorySchema>;

export const createFinancialCategorySchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
    type: z.enum(['INCOME', 'EXPENSE']),
    parentId: z.string().uuid().optional(),
    companyId: z.string().uuid(),
});
