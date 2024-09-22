import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  IUserRepository,
  LoginBody,
  UserCreate,
} from "./repository/IUserRepository";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register({ password, ...body }: UserCreate) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...body,
      password: hashedPassword,
    });

    if (!user) {
      throw { status: 404, message: "Company not found" };
    }

    return { message: "Cadastro de usuário realizado com sucesso!" };
  }

  async login(body: LoginBody) {
    const user = await this.userRepository.findUserByEmail(body.email);

    console.log("user", user);
    if (!user) {
      throw { status: 401, message: "Dados inválidos" };
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      throw { status: 401, message: "Dados inválidos" };
    }

    const token = jwt.sign({ ...user }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    return { token, ...user };
  }
}
