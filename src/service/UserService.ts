import * as bcrypt from "bcryptjs";
import { User, UserSex } from '../model/User';
import { UserRepository } from '../repository/UserRepository';
import UserConstraint from "../util/UserConstraint";

const userRepository = new UserRepository();
const saltRounds = 10;

class UserService {

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

    UserConstraint.validateName(name);
    UserConstraint.validateEmail(email);

    UserConstraint.validatePassword(password);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    UserConstraint.validateCpf(cpf);
    UserConstraint.validateBirthday(birthday);
    UserConstraint.validateSex(sex);
    UserConstraint.validateAddress(address);
    UserConstraint.validatePhone(phone);

    return await userRepository.createUser(
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
    return await userRepository.getUserById(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await userRepository.getAllUsers();
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

    if (data.name) UserConstraint.validateName(data.name);
    if (data.email) UserConstraint.validateEmail(data.email);

    if (data.password) {
      UserConstraint.validatePassword(data.password);
      data.password = await bcrypt.hash(data.password, saltRounds);
    }

    if (data.cpf) UserConstraint.validateCpf(data.cpf);
    if (data.birthday) UserConstraint.validateBirthday(data.birthday);
    if (data.sex) UserConstraint.validateSex(data.sex);
    if (data.address) UserConstraint.validateAddress(data.address);
    if (data.phone) UserConstraint.validatePhone(data.phone);

    return await userRepository.updateUser(id, data);
  }

  async deleteUser(id: number): Promise<boolean> {
    return await userRepository.deleteUser(id);
  }
  
}

export default new UserService();