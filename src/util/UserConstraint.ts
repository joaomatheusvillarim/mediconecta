import { UserSex } from "../model/User";

class UserConstraint {

  /**
   * name: não vazio
   * email: não vazio, formato e-mail correto
   * password: length >= 8, contém números, letras maiùsculas e minúsculas, e caracteres especiais
   * cpf: isNumeric, length == 11, validação especial
   * birthday: anterior ou igual a hoje
   * sex: UserSex
   * address: não vazio
   * phone: isNumeric, 10 ou 11 digitos
  */

  validateName(name: string) {
    if (name.trim() == "") throw new Error("O nome não pode ser vazio.");
  }

  validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("O e-mail deve ser um endereço válido.")
    }
  }

  validatePassword(password: string) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error("A senha deve ter no mínimo 8 caracteres, incluindo um número, uma letra minúscula, uma letra maiúscula, e um caractere especial.")
    }
  }

  validateCpf(cpf: string) {
    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpf)) {
      throw new Error("O CPF deve conter exatamente 11 dígitos.")
    }
  }

  validateBirthday(birthday: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    birthday.setHours(0, 0, 0, 0);
    if (birthday > today) {
      throw new Error("A data de nascimento deve ser anterior a hoje.");
    }
  }

  validateSex(sex: string) {
    sex = sex.toUpperCase();
    if (!(sex in Object.values(UserSex))) {
      throw new Error("O sexo deve ser masculino, feminino, ou não especificado");
    }
  }

  validateAddress(address: string) {
    if (address.trim() == "") {
      throw new Error("O endereço não pode ser vazio.");
    }
  }

  validatePhone(phone: string) {
    const phoneRegex = /^(\d{2})9?\d{8}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("O número de telefone deve conter exatamente 10 ou 11 dígitos.");
    }
  }

}

export default new UserConstraint();