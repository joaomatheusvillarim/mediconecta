import * as bcrypt from "bcryptjs";
import { User, UserSex } from '../model/User';
import { UserRepository } from '../repository/UserRepository';
import Validations from "../util/Validations";

const saltRounds = 10;

export class UserService {

  private userRepository: UserRepository;

  constructor(userRepository?: UserRepository) {
    this.userRepository = userRepository || new UserRepository();
  }

  async createUser(
    name: string,
    email: string,
    password: string,
    cpf: string,
    birthday: Date,
    sex: UserSex,
    address: string,
    phone: string
  ): Promise<User> {

    Validations.validateName(name);
    Validations.validateEmail(email);

    Validations.validatePassword(password);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    Validations.validateCpf(cpf);
    Validations.validateBirthday(birthday);

    if (!sex) sex = UserSex.NAO_ESPECIFICADO;
    Validations.validateSex(sex);

    Validations.validateAddress(address);
    Validations.validatePhone(phone);

    return await this.userRepository.createUser(
      name,
      email,
      hashedPassword,
      cpf,
      birthday,
      sex,
      address,
      phone
    );
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async updateUser(
    id: number,
    data: Partial<{
      name: string;
      email: string;
      password: string;
      cpf: string;
      birthday: Date;
      sex: UserSex;
      address: string;
      phone: string;
    }>
  ): Promise<User | null> {

    if (data.name) Validations.validateName(data.name);
    if (data.email) Validations.validateEmail(data.email);

    if (data.password) {
      Validations.validatePassword(data.password);
      data.password = await bcrypt.hash(data.password, saltRounds);
    }

    if (data.cpf) Validations.validateCpf(data.cpf);
    if (data.birthday) Validations.validateBirthday(data.birthday);
    if (data.sex) Validations.validateSex(data.sex);
    if (data.address) Validations.validateAddress(data.address);
    if (data.phone) Validations.validatePhone(data.phone);

    return await this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepository.deleteUser(id);
  }
  
}
