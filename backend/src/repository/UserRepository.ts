import { User, UserSex } from '../model/User'

export class UserRepository {
  
  async createUser(
    name: string,
    email: string,
    password: string,
    cpf: string,
    birthday: Date,
    sex: UserSex,
    address: string,
    phone: string
  ) {
    return await User.create({
      name,
      email,
      password,
      cpf,
      birthday,
      sex,
      address,
      phone
    });
  }

  async getUserById(id: number) {
    return await User.findByPk(id);
  }

  async getAllUsers() {
    return await User.findAll();
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
  ) {
    const user = await User.findByPk(id);
    return user
      ? await user!.update(data)
      : null;
  }

  async deleteUser(id: number) {
    let resp = false;
    const user = await User.findByPk(id);
    if (user) {
      await user!.destroy();
      resp = true;
    }
    return resp;
  }

}