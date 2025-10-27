import { CompanyService } from '../modules/companies/companies.service';
import { CompanyPrismaRepository } from '../modules/companies/repositories/CompanyPrismaRepository';
import { prismaClient } from '../prisma/prismaClient';

export async function seedCompanies() {
    const companyRepository = new CompanyPrismaRepository();
    const companyService = new CompanyService(companyRepository);

    const companies = [
        {
            id: '80ab45b4-a5b5-4633-9e77-bbf46cf91278',
            name: 'Empresa Test',
            cnpj: '12345678000199',
            banner: 'https://example.com/banners/techsolutions_banner.png',
            countryId: 'BR',
            stateId: 'SC',
            cityId: '4202453',
            address: 'Rua da Inovação, 123',
            phone1: '+5511987654321',
            phone2: null,
            hasWhatsapp1: true,
            hasWhatsapp2: false,
            email: 'empresateste@teste.com.br',
            website: 'https://www.techsolutions.com.br',
            registrationNumber: '987654321',
            taxRegime: 'Lucro Real',
            headquarters: true,
            isActive: true,
            documentStorageUrl: 'https://storage.provider.com/techsolutions/documents/',
        },
    ];

    for (const company of companies) {
        try {
            const exist = await companyService.findOne(company.id);

            if (!exist) {
                await prismaClient.company.upsert({
                    where: { id: company.id },
                    update: {},
                    create: company,
                });
            }
        } catch (err: any) {
            if (err.code === 'P2002') {
                console.log(`⚠️ Empresa ${company.id} já existe, ignorando...`);
            } else {
                throw err;
            }
        }
    }

    console.log(`✅ Seeded ${companies.length} companies`);
}
