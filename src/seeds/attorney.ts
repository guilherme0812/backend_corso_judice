import { AttorneyService } from '../modules/Attorneys/attorneys.service';
import { AttorneyPrismaRepository } from '../modules/Attorneys/repository/AttorneyPrismaRepository';
import { prismaClient } from '../prisma/prismaClient';

export async function seedAttorneys() {
    const attorneyRepository = new AttorneyPrismaRepository();
    const attorneyService = new AttorneyService(attorneyRepository);

    const list = [
        {
            id: '0acb10dd-3a96-4f6f-95ad-441865f9b9111',
            firstName: 'Fulano',
            lastName: 'Almeida',
            licenceNumber: '12.000',
            licenceJurisdiction: 'Santa Catarina',
            licenceCountryCode: 'BR',
            phone: '+55 11 91234-5678',
            email: 'Fulanoalmeidadv@advogados.com',
            nationality: 'Brasileiro',
            maritalStatus: 'Solteiro',
            professionalAddress: 'Av. Paulista, 1000 - São Paulo, SP',
            companyId: '80ab45b4-a5b5-4633-9e77-bbf46cf91278',
        },
    ];

    for (const item of list) {
        try {
            const exist = await attorneyService.findOne(item.id);

            if (!exist) {
                await prismaClient.attorney.upsert({
                    where: { id: item.id },
                    update: {},
                    create: item as any,
                });
            }
        } catch (err: any) {
            if (err.code === 'P2002') {
                console.log(`⚠️ Attorneys ${item.id} já existe, ignorando...`);
            } else {
                throw err;
            }
        }
    }

    console.log(`✅ Seeded ${list.length} attorneys`);
}
