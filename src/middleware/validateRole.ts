import { FastifyReply, FastifyRequest } from 'fastify';
import { Role, UserDataType } from '../modules/users/repository/IUserRepository';

export function authorizeRoles(...roles: Role[]) {
    return async (request: FastifyRequest & { user: UserDataType }, reply: FastifyReply) => {
        if (!roles.includes(request.user.role)) {
            return reply.status(403).send({ message: 'Access denied' });
        }
    };
}

export async function isAdminMiddleware(
    req: FastifyRequest & { user: UserDataType }, // Permite qualquer rota genérica
    reply: FastifyReply,
) {
    if (req.user?.role != Role.admin) {
        return reply.status(403).send({ message: 'Access denied, only for admin role' });
    }
}
