import { UserSex } from "../model/User";

class Validations {

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

  private isEmpty(value: string) {
    return value.trim() == "";
  }

  validateName(name: string) {
    if (this.isEmpty(name)) throw new Error("O nome não pode ser vazio.");
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
    if (this.isEmpty(address)) {
      throw new Error("O endereço não pode ser vazio.");
    }
  }

  validatePhone(phone: string) {
    const phoneRegex = /^(\d{2})9?\d{8}$/;
    if (!phoneRegex.test(phone)) {
      throw new Error("O número de telefone deve conter exatamente 10 ou 11 dígitos.");
    }
  }

  validateWorkingHours(workingHours: string) {
    if (this.isEmpty(workingHours)) {
      throw new Error("O horário de funcionamento não pode vazio.")
    }
  }

  validateSpecialties(specialties: string) {
    if (this.isEmpty(specialties)) {
      throw new Error("As especialidades não podem ser vazio.")
    }
  }

}

export default new Validations();