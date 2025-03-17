import { UserSex } from "../model/User";
import UserService from "../service/UserService";
import ClinicService from "../service/ClinicService";
import RecordService from "../service/RecordService";

class Validations {

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
    if (birthday > today) {
      throw new Error("A data de nascimento deve ser anterior a hoje.");
    }
  }

  validateSex(sex: string) {
    sex = sex.toUpperCase();
    if (!Object.values(UserSex).includes(sex as UserSex)) {
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

  async validateUserId(userId: number) {
    if (! await UserService.getUserById(userId)) throw new Error("O usuário deve ter um ID válido");
  }

  async validateClinicId(clinicId: number) {
    if (! await ClinicService.getClinicById(clinicId)) throw new Error("O consultório deve ter um ID válido");
  }

  async validateRecordEntryIndex(
    userId: number,
    clinicId: number,
    index: number
  ) {
    const record = await RecordService.getAllRecordEntries(userId, clinicId);

    if (record) {
      if (index >= record.entries.length || index < 0) throw new Error("O registro de prontuário deve ter um índice válido.");
    } else {
      throw new Error("O registro deve pertencer a um prontuário válido.");
    }

  }

  validateRecordEntryContent(content: string) {
    if (!this.isEmpty(content)) throw new Error("O conteúdo de um registro no prontuário não pode ser vazio.");
  }

  validateDoctorCredentials(credentials: string) {
    const credentialsRegex = /^\d{4,6}[A-Z]{2}$/i;
    if (!credentialsRegex.test(credentials)) throw new Error("O CRM deve ter credenciais válidas.")
  }

  validateInsurance(insurance: string) {
    if (this.isEmpty(insurance)) throw new Error("O convênio não pode ser vazio.")
  }

  validateAnnouncementTitle(title: string) {
    if (this.isEmpty(title)) throw new Error("O título do aviso não pode ser vazio.")
  }

  validateAnnouncementText(text: string) {
    if (this.isEmpty(text)) throw new Error("O texto do aviso não pode ser vazio.")
  }

}

export default new Validations();