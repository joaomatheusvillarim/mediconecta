import { RecordService } from "../../src/service/RecordService";
import { RecordRepository } from "../../src/repository/RecordRepository";
import { Record } from "../../src/model/Record";
import { UserService } from "../../src/service/UserService"
import { ClinicService } from "../../src/service/ClinicService";
import { User, UserSex } from "../../src/model/User";
import { Clinic } from "../../src/model/Clinic";

jest.mock("../../src/repository/RecordRepository");
jest.mock("../../src/service/UserService");
jest.mock("../../src/service/ClinicService");

describe("Testes de RecordService", () => {
  let recordService: RecordService;
  let recordRepositoryMock: jest.Mocked<RecordRepository>;
  let mockRecord: Record;
  let userServiceMock: jest.Mocked<UserService>;
  let clinicServiceMock: jest.Mocked<ClinicService>;
  let mockUser: User;
  let mockClinic: Clinic;

  beforeEach(() => {
    recordRepositoryMock = new RecordRepository() as jest.Mocked<RecordRepository>;
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    clinicServiceMock = new ClinicService() as jest.Mocked<ClinicService>;
    recordService = new RecordService(userServiceMock, clinicServiceMock, recordRepositoryMock);
    mockRecord = Record.build({
      userId: 1,
      clinicId: 1,
      entries: ["data: 14/04, paciente apresenta sintomas de"],
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
    it("deve criar um novo registro prontuário com sucesso", async () => {
      //mock das dependencias
      userServiceMock.getUserById.mockResolvedValue(mockUser);
      clinicServiceMock.getClinicById.mockResolvedValue(mockClinic);
      recordRepositoryMock.createRecordEntry.mockResolvedValue(mockRecord);

      //chamada ao recordService
      const result = await recordService.createRecordEntry(
        1,
        1,
        "data: 14/04, paciente apresenta sintomas de",
      );

      //expect das dependencias
      expect(userServiceMock.getUserById).toHaveBeenCalledWith(1);
      expect(clinicServiceMock.getClinicById).toHaveBeenCalledWith(1);
      expect(recordRepositoryMock.createRecordEntry).toHaveBeenCalledWith(1, 1, "data: 14/04, paciente apresenta sintomas de");

      //expect do resultado
      expect(result).toBe(mockRecord);
    });

    it("deve recuperar um registro em prontuário válido com sucesso", async () => {
      //mock das dependencias
      recordRepositoryMock.getRecordEntryByIndex.mockResolvedValue("data: 14/04, paciente apresenta sintomas de");

      //chamada ao recordService
      const result = await recordService.getRecordEntryByIndex(1, 1, 1);

      //expect das dependencias
      expect(recordRepositoryMock.getRecordEntryByIndex).toHaveBeenCalledWith(1, 1, 1);

      //expect do resultado
      expect(result).toBe("data: 14/04, paciente apresenta sintomas de");
    });

    it("deve retornar todos os registros em um prontuário com sucesso", async () => {
      //mock das dependencias
      recordRepositoryMock.getAllRecordEntries.mockResolvedValue(mockRecord);

      //chamada ao recordService
      const result = await recordService.getAllRecordEntries(1, 1);

      //expect das dependencias
      expect(recordRepositoryMock.getAllRecordEntries).toHaveBeenCalledWith(1, 1);

      //expect do resultado
      expect(result).toBe(mockRecord);
    });

    it("deve atualizar um registro em prontuário válido com sucesso", async () => {
      //mock das dependencias
      userServiceMock.getUserById.mockResolvedValue(mockUser);
      clinicServiceMock.getClinicById.mockResolvedValue(mockClinic);
      const mockUpdatedRecord = Record.build({
        userId: 1,
        clinicId: 1,
        entries: [
          "data: 15/04, paciente continua apresentando sintomas de",
        ],
      });
      recordRepositoryMock.updateRecordEntry.mockResolvedValue(mockUpdatedRecord);

      //chamada ao recordService
      const result = await recordService.updateRecordEntry(
        1,
        1,
        1,
        "data: 15/04, paciente continua apresentando sintomas de"
      );

      //expect das dependencias
      expect(userServiceMock.getUserById).toHaveBeenCalledWith(1);
      expect(clinicServiceMock.getClinicById).toHaveBeenCalledWith(1);
      expect(recordRepositoryMock.updateRecordEntry).toHaveBeenCalledWith(1, 1, 1, "data: 15/04, paciente continua apresentando sintomas de");

      //expect do resultado
      expect(result).toBe(mockUpdatedRecord);
    });

    it("deve remover um registro em prontuário com sucesso", async () => {
      //mock das dependencias
      recordRepositoryMock.deleteRecordEntry.mockResolvedValue(true);

      //chamada ao recordService
      const result = await recordService.deleteRecordEntry(1, 1, 1);

      //expect das dependencias
      expect(recordRepositoryMock.deleteRecordEntry).toHaveBeenCalledWith(1, 1, 1);

      //expect do resultado
      expect(result).toBeTruthy();
    });

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um registro em prontuário com dados inválidos", async () => {
      //mock das dependencias
      //chamada ao recordService
      //expect das dependencias
      //expect do resultado
    });

    it("deve falhar em recuperar um registro prontuário inexistente", async () => {
      //mock das dependencias
      //chamada ao recordService
      //expect das dependencias
      //expect do resultado
    });

    it("deve falhar em recuperar todos os registros de um prontuário devido a uma falha no banco de dados", async () => {
      //mock das dependencias
      //chamada ao recordService
      //expect das dependencias
      //expect do resultado
    });

    it("deve falhar em atualizar um prontuário com dados inválidos", async () => {
      //mock das dependencias
      //chamada ao recordService
      //expect das dependencias
      //expect do resultado
    });

    it("deve falhar em remover um registro em prontuário inexistente", async () => {
      //mock das dependencias
      //chamada ao recordService
      //expect das dependencias
      //expect do resultado
    });

  });

});