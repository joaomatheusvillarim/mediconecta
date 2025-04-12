import { PatientService } from "../../src/service/PatientService";
import { PatientRepository } from "../../src/repository/PatientRepository";
import { Patient } from "../../src/model/Patient";
import { UserService } from "../../src/service/UserService"
import { ClinicService } from "../../src/service/ClinicService";
import { User, UserSex } from "../../src/model/User";
import { Clinic } from "../../src/model/Clinic";

jest.mock("../../src/repository/PatientRepository");
jest.mock("../../src/service/UserService");
jest.mock("../../src/service/ClinicService");

describe("Testes de PatientService", () => {
  let patientService: PatientService;
  let patientRepositoryMock: jest.Mocked<PatientRepository>;
  let mockPatient: Patient;
  let userServiceMock: jest.Mocked<UserService>;
  let clinicServiceMock: jest.Mocked<ClinicService>;
  let mockUser: User;
  let mockClinic: Clinic;

  beforeEach(() => {
    patientRepositoryMock = new PatientRepository() as jest.Mocked<PatientRepository>;
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    clinicServiceMock = new ClinicService() as jest.Mocked<ClinicService>;
    patientService = new PatientService(userServiceMock, clinicServiceMock, patientRepositoryMock);
    mockPatient = Patient.build({
      userId: 1,
      clinicId: 1,
    });
    mockClinic = Clinic.build({
      id: 1,
      adminId: 1,
      name: "Test Clinic",
      address: "rua dos bobos, 0",
      workingHours: "segunda a sexta 12:00 as 12:01",
      specialties: "bobologia",
      phone: "83987654321",
      email: "testclinic@gmail.com",
    });
    mockUser = User.build({
      id: 1,
      name: "Test Clinic Admin",
      email: "test@gmail.com",
      password: "HashedPassword!123",
      cpf: "12345678900",
      birthday: new Date("2000-01-01"),
      sex: UserSex.NAO_ESPECIFICADO,
      address: "rua dos bobos, 0",
      phone: "83987654321",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  
  describe("Testes de sucesso", () => {
    it("deve criar um novo paciente com sucesso", async () => {
      //mocks de dependencias
      userServiceMock.getUserById.mockResolvedValue(mockUser);
      clinicServiceMock.getClinicById.mockResolvedValue(mockClinic);
      patientRepositoryMock.createPatient.mockResolvedValue(mockPatient);

      //chamada ao patientService
      const result = await patientService.createPatient(1, 1);

      //expects de dependencias
      expect(userServiceMock.getUserById).toHaveBeenCalledWith(1);
      expect(clinicServiceMock.getClinicById).toHaveBeenCalledWith(1);
      expect(patientRepositoryMock.createPatient).toHaveBeenCalledWith(1, 1);
      
      //expect de resultado
      expect(result).toBe(mockPatient);
    });

    it("deve recuperar um paciente válido com sucesso", async () => {
      //mocks de dependencias
      patientRepositoryMock.getPatientById.mockResolvedValue(mockPatient);

      //chamada ao patientService
      const result = await patientService.getPatientById(1, 1);

      //expects de dependencias
      expect(patientRepositoryMock.getPatientById).toHaveBeenCalledWith(1, 1);

      //expect de resultado
      expect(result).toBe(mockPatient);
    });

    it("deve retornar todos os pacientes com sucesso", async () => {
      //mocks de dependencias
      patientRepositoryMock.getAllPatients.mockResolvedValue(
        [
          Patient.build({
            userId: 1,
            clinicId: 1,
          })
        ]
      );

      //chamada ao patientService
      const result = await patientService.getAllPatients(1);

      //expect de dependencias
      expect(patientRepositoryMock.getAllPatients).toHaveBeenCalledWith(1);

      //expect de resultado
      expect(result).toEqual( [ mockPatient ] );
    });

    it("deve atualizar um paciente válido com sucesso", async () => {
      //mocks de dependencias
      patientRepositoryMock.updatePatient.mockResolvedValue(null);

      //chamada ao patientService
      const result = await patientService.updatePatient(1, 1);

      //expects de dependencias
      expect(patientRepositoryMock.updatePatient).toHaveBeenCalledWith(1, 1);

      //expect de resultado
      expect(result).toBeNull();
    });

    it("deve remover um paciente com sucesso", async () => {
      //mocks de dependencias
      patientRepositoryMock.deletePatient.mockResolvedValue(true);

      //chamada ao patientService
      const result = await patientService.deletePatient(1, 1);

      //expects de dependencias
      expect(patientRepositoryMock.deletePatient).toHaveBeenCalledWith(1, 1);

      //expect de resultado
      expect(result).toBeTruthy();
    });

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um paciente com dados inválidos", async () => {
      //mocks de dependencias
      userServiceMock.getUserById.mockResolvedValue(null);
      clinicServiceMock.getClinicById.mockResolvedValue(null);

      //expect de resultado
      await expect(
        patientService.createPatient(99, 99)
      ).rejects.toThrow(Error);
    });

    it("deve falhar em recuperar um paciente inexistente", async () => {
      //mocks de dependencias
      patientRepositoryMock.getPatientById.mockResolvedValue(null);

      //chamada ao patientService
      const result = await patientService.getPatientById(99, 99);

      //expects de dependencias
      expect(patientRepositoryMock.getPatientById).toHaveBeenCalledWith(99, 99);

      //expect de resultado
      expect(result).toBeNull();
    });

    it("deve falhar em recuperar todos os pacientes devido a uma falha no banco de dados", async () => {
      //mocks de dependencias
      patientRepositoryMock.getAllPatients.mockRejectedValue(new Error());

      //expect de resultado
      await expect(patientService.getAllPatients).rejects.toThrow(Error);
    });

    it("deve falhar em atualizar um paciente com dados inválidos", async () => {
      //mocks de dependencias
      patientRepositoryMock.updatePatient.mockResolvedValue(null);

      //chamada ao patientService
      const result = await patientService.updatePatient(1, 1);

      //expects de dependencias
      expect(patientRepositoryMock.updatePatient).toHaveBeenCalledWith(1, 1);

      //expect de resultado
      expect(result).toBeNull();
    });

    it("deve falhar em remover um paciente inexistente", async () => {
      //mocks de dependencias
      patientRepositoryMock.deletePatient.mockResolvedValue(false);

      //chamada ao patientService
      const result = await patientService.deletePatient(99, 99);

      //expects de dependencias
      expect(patientRepositoryMock.deletePatient).toHaveBeenCalledWith(99, 99);
      
      //expect de resultado
      expect(result).toBeFalsy();
    });

  });
  

});