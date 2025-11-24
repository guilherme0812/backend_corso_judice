import { prismaClient } from '../../../prisma/prismaClient';
import { UserCreate, UserDataType, IUserRepository, GenericParams, Role } from './IUserRepository';

export class UserPrismaRepository implements IUserRepository {
    async findAll({ companyId, name }: GenericParams): Promise<UserDataType[]> {
        const whereClause: any = {};

        if (companyId) {
            whereClause.companyId = companyId;
        }

        if (name) {
            whereClause.OR = [
                { firstName: { contains: name, mode: 'insensitive' } },
                { lastName: { contains: name, mode: 'insensitive' } },
            ];
        }

        const users = prismaClient.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                phone: true,
                companyId: true,
                profilePicture: true,
                hasWhatsapp: true,
                status: true,
                createAt: true,
            },
            where: whereClause,
        });

        return users as unknown as UserDataType[];
    }

    async findUserByEmail(email: string): Promise<UserDataType | null> {
        const user: any = prismaClient.user.findUnique({
            where: { email },
            include: {
                company: true,
            },
        });

        return user;
    }

    async findOne(id: string): Promise<UserDataType | null> {
        const user = prismaClient.user.findUnique({
            where: { id },
        });

        return user;
    }

    async create(body: UserCreate): Promise<UserDataType> {
        return prismaClient.user.create({
            data: {
                ...body,
                role: body.role as any,
            },
        });
    }

    async update(body: UserCreate): Promise<UserDataType> {
        return prismaClient.user.update({
            where: { id: body.id },
            data: { ...body, role: body.role as unknown as Role },
        });
    }

    remove(id: string): Promise<UserDataType> {
        return prismaClient.user.delete({ where: { id } });
    }
}
