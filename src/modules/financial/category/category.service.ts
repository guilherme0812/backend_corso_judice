import { FinancialCategoryDataType, GetFinancialCategoriesDTO } from './category.schema';
import { FinancialCategoryRepository } from './categoryRepository';

export class FinancialCategoryService {
    private readonly repo = new FinancialCategoryRepository();

    async findAll(params: GetFinancialCategoriesDTO) {
        const data = await this.repo.findAll(params);
        return data;
    }

    async findOne(id: string) {
        const data = await this.repo.findById(id);
        return data;
    }

    async findOneOrThrow(id: string) {
        const data = await this.findOne(id);

        if (!data) {
            throw { status: 404, message: 'Category not found' };
        }

        return data;
    }

    async create(body: Omit<FinancialCategoryDataType, 'id'>) {
        const data = await this.repo.create(body);
        return data;
    }

    async remove(id: string) {
        await this.findOneOrThrow(id);

        await this.repo.remove(id);
    }
}
