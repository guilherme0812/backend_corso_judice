import 'fastify';
import { FastifyRequest } from 'fastify';
import { UserDataType } from '../modules/users/repository/IUserRepository';

declare module 'fastify' {
    interface FastifyRequest {
        user: UserDataType;
    }
}
