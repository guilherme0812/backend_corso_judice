import { FastifyReply, FastifyRequest } from 'fastify';
import { UserPrismaRepository } from './repository/UsersPrismaRepository';
import { UserService } from './users.service';
import { GenericParams, UserCreate } from './repository/IUserRepository';

interface LoginBody {
    email: string;
    password: string;
}

interface UserQuery {
    id: string;
}

const userRepository = new UserPrismaRepository();
const userService = new UserService(userRepository);

export class UserController {
    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as LoginBody;
        try {
            if (email && password) {
                const user = await userService.login({ email, password });
                reply.status(201).send(user);
            } else {
                reply.status(400).send({ message: 'email or password' });
            }
        } catch (error: any) {
            reply.status(error.status || 400).send({ message: error.message });
        }
    }

    async findAll(request: FastifyRequest<{ Querystring: GenericParams }>, reply: FastifyReply) {
        try {
            const user = await userService.findAll(request.query);
            reply.status(201).send(user);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }
    async findAllByUser(request: FastifyRequest<{ Querystring: GenericParams }>, reply: FastifyReply) {
        try {
            const user = await userService.findAll(request.query, request.user);
            reply.status(201).send(user);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }

    async register(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = await userService.register(request.body as UserCreate);
            reply.status(201).send(user);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }

    async loginSocial(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = await userService.loginSocial(request.body as UserCreate);
            reply.status(200).send(user);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = await userService.update(request.body as UserCreate);
            reply.status(200).send(user);
        } catch (error: any) {
            reply.status(400).send({ message: error.message });
        }
    }

    async remove(request: FastifyRequest<{ Querystring: UserQuery }>, reply: FastifyReply) {
        try {
            const user = await userService.remove(request.query.id);
            reply.status(200).send(user);
        } catch (error: any) {
            reply.status(error.status || 400).send({ message: error.message });
        }
    }
}
