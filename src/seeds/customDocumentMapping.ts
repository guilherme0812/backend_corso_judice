import { CompanyService } from '../modules/companies/companies.service';
import { CompanyPrismaRepository } from '../modules/companies/repositories/CompanyPrismaRepository';
import { prismaClient } from '../prisma/prismaClient';

export async function seedCustomDocumentMapping() {
    const companyRepository = new CompanyPrismaRepository();
    const companyService = new CompanyService(companyRepository);

    const list = [
        {
            companyId: '80ab45b4-a5b5-4633-9e77-bbf46cf91278',
            customMappingJson: {
                grantor: {
                    document: 'document',
                    officialId: 'officialId',
                    officialIdIssuingBody: 'officialIdIssuingBody',
                    officialIdissuingState: 'officialIdissuingState',
                    phone: 'phone',
                    email: 'email',
                    addressStreet: 'addressStreet',
                    addressNumber: 'addressNumber',
                    addressComplement: 'addressComplement',
                    addressZipCode: 'addressZipCode',
                    zone: 'zone',
                    birthDate: 'birthDate',
                    nacionality: 'nacionality',
                    maritalStatus: 'maritalStatus',
                    profession: 'profession',
                    stateId: 'stateId',
                    countryId: 'countryId',
                    name: 'name',
                    city: 'city',
                },
                grantee: {
                    name: 'name',
                    licenceNumber: 'licenceNumber',
                    licenceJurisdiction: 'licenceJurisdiction',
                    licenceCountryCode: 'licenceCountryCode',
                    phone: 'phone',
                    email: 'email',
                    nationality: 'nationality',
                    maritalStatus: 'maritalStatus',
                    professionalAddress: 'professionalAddress',
                },
            },
        },
    ];

    for (const item of list) {
        try {
            const existCompany = await companyService.findOne(item.companyId);

            if (existCompany) {
                await prismaClient.customDocumentMapping.upsert({
                    where: { companyId: item.companyId },
                    update: {},
                    create: item,
                });
            }
        } catch (err: any) {
            if (err.code === 'P2002') {
                console.log(`⚠️ Custom document mapping já existe, ignorando...`);
            } else {
                throw err;
            }
        }
    }

    console.log(`✅ Seeded ${list.length} custom document mapping`);
}
