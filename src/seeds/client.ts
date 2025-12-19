import { AttorneyService } from '../modules/Attorneys/attorneys.service';
import { AttorneyPrismaRepository } from '../modules/Attorneys/repository/AttorneyPrismaRepository';
import { ClientService } from '../modules/clients/clients.service';
import { ClientPrismaRepository } from '../modules/clients/repository/ClientPrismaRepository';
import { prismaClient } from '../prisma/prismaClient';

export async function seedClients() {
    const clientRepository = new ClientPrismaRepository();
    const clientService = new ClientService(clientRepository);

    const list = [
        {
            document: '09500290926',
            officialId: '6470043',
            officialIdIssuingBody: 'SSP',
            officialIdissuingState: 'SC',
            firstName: 'Guilherme',
            lastName: 'Corso',
            phone: '11999998888',
            email: 'guilhermemaffei@example.com',
            hasWhatsapp: true,
            addressStreet: 'Rua das Flores',
            addressNumber: '123',
            addressComplement: 'Apto 45 - Bloco B',
            addressZipCode: '04567-000',
            zone: 'José Amandio',
            birthDate: '1990-05-15T00:00:00.000Z',
            notes: 'Cliente frequente, prefere contato por WhatsApp.',
            nacionality: 'Brasileiro',
            cityId: '4202305',
            stateId: 'SC',
            countryId: 'BR',
        },
        {
            document: '09500290123',
            officialId: '6470099',
            officialIdIssuingBody: 'SSP',
            officialIdissuingState: 'SC',
            firstName: 'Carlos',
            lastName: 'Silva',
            phone: '11999998888',
            email: 'carlossilva123@example.com',
            hasWhatsapp: true,
            addressStreet: 'Rua das Flores',
            addressNumber: '123',
            addressComplement: 'Apto 45 - Bloco B',
            addressZipCode: '04567-000',
            zone: 'José Amandio',
            birthDate: '1990-05-15T00:00:00.000Z',
            notes: 'Cliente frequente, prefere contato por WhatsApp.',
            nacionality: 'Brasileiro',
            cityId: '4202305',
            stateId: 'SC',
            countryId: 'BR',
            companyId: '80ab45b4-a5b5-4633-9e77-bbf46cf91278',
        },
        {
            document: '98700290123',
            officialId: '6470049',
            officialIdIssuingBody: 'SSP',
            officialIdissuingState: 'SC',
            firstName: 'Maria',
            lastName: 'Silva',
            phone: '11999998888',
            email: 'carlossilva123@example.com',
            hasWhatsapp: true,
            addressStreet: 'Rua das Flores',
            addressNumber: '123',
            addressComplement: 'Apto 45 - Bloco B',
            addressZipCode: '04567-000',
            zone: 'José Amandio',
            birthDate: '1990-05-15T00:00:00.000Z',
            notes: 'Cliente frequente, prefere contato por WhatsApp.',
            nacionality: 'Brasileiro',
            cityId: '4202305',
            stateId: 'SC',
            countryId: 'BR',
            companyId: '80ab45b4-a5b5-4633-9e77-bbf46cf91278',
        },
    ];

    for (const item of list) {
        try {
            const exist = await clientService.findOne(item.document);
            if (!exist) {
                await prismaClient.client.upsert({
                    where: { document: item.document },
                    update: {},
                    create: item as any,
                });
            }
        } catch (err: any) {
            if (err.code === 'P2002') {
                console.log(`⚠️ Clients ${item.document} já existe, ignorando...`);
            } else {
                throw err;
            }
        }
    }

    console.log(`✅ Seeded ${list.length} clients`);
}
