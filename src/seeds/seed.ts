import { prismaClient } from '../prisma/prismaClient';
import { seedAttorneys } from './attorney';
import { seedClients } from './client';
import { seedCompanies } from './company';
import { seedUsers } from './user';

async function runSeed() {
    console.log('🌱 Starting seed...');

    await seedCompanies();
    await seedUsers();
    await seedAttorneys();
    await seedClients();

    console.log('✅ All seeds completed.');

    await prismaClient.$disconnect();
}

runSeed().catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
});
