import { UserPrismaRepository } from '../modules/users/repository/UsersPrismaRepository';
import { UserService } from '../modules/users/users.service';
import { prismaClient } from '../prisma/prismaClient';

export async function seedUsers() {
    const userRepository = new UserPrismaRepository();
    const userService = new UserService(userRepository);

    const list = [
        {
            id: '8c631347-9f3b-4648-b8c8-3c4c433f706a',
            email: 'admin@exemplo.com',
            password: 'senha_segura',
            role: 'admin',
            firstName: 'Fulano',
            lastName: 'da Silva',
            phone: '5511999998888',
            hasWhatsapp: true,
            profilePicture: null,
            status: "ACTIVE",
            companyId: '80ab45b4-a5b5-4633-9e77-bbf46cf91278',
        },
    ];

    for (const item of list) {
        try {
            const exist = await userService.findOne(item.id);
            const password = await userService.generatePassword(item.password);
            if (!exist) {
                await prismaClient.user.upsert({
                    where: { id: item.id },
                    update: {},
                    create: { ...item, password } as any,
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

    console.log(`✅ Seeded ${list.length} users`);
}
