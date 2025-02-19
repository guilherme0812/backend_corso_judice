export enum Role {
  "admin",
  "owner",
  "employee",
}
export interface UserCreate {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyId: string;
  role: Role;
  phone: string | null;
  hasWhatsapp: boolean;
  profilePicture: string | null;
  isActive: boolean;
  lastLoginAt: string | null;
}

export interface UserDataType {
  id: string;
  email: string;
  password: string | null;
  role: any;
  firstName: string;
  lastName: string;
  phone: string | null;
  hasWhatsapp: Boolean;
  profilePicture: String | null;
  isActive: Boolean;
  lastLoginAt: Date | null;
  createAt: Date;
  updateAt: Date;
  companyId: string | null;
}

export type LoginBody = {
  email: string;
  password: string;
};

export interface IUserRepository {
  findAll: () => Promise<UserDataType[]>;
  findUserByEmail: (email: string) => Promise<UserDataType | null>;
  findOne: (id: string) => Promise<UserDataType | null>;
  create: (body: UserCreate) => Promise<any>;
  update(data: UserCreate): Promise<UserDataType>;
  remove(id: string): Promise<UserDataType>;
}
