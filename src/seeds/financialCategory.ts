import { FinancialCategoryService } from '../modules/financial/category/category.service';
import { prismaClient } from '../prisma/prismaClient';

export async function seedFinancialCategories() {
    const service = new FinancialCategoryService();

    const list = [
        {
            id: 'a1603d04-2be7-43c7-8805-5981fd6496e9',
            // companyId: '80ab45b4-a5b5-4633-9e77-bbf46cf91278',
            name: 'automated transaction',
            type: 'INCOME',
        },
    ];

    for (const item of list) {
        try {
            const exist = await service.findOne(item.id);
            if (!exist) {
                await prismaClient.user.upsert({
                    where: { id: item.id },
                    update: {},
                    create: { ...item } as any,
                });
            }
        } catch (err: any) {
            if (err.code === 'P2002') {
                console.log(`⚠️ User ${item.id} já existe, ignorando...`);
            } else {
                throw err;
            }
        }
    }

    console.log(`✅ Seeded ${list.length} financial category`);
}
