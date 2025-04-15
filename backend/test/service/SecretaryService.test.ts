import { SecretaryService } from "../../src/service/SecretaryService";
import { SecretaryRepository } from "../../src/repository/SecretaryRepository";
import { Secretary } from "../../src/model/Secretary";
import { UserService } from "../../src/service/UserService";
import { ClinicService } from "../../src/service/ClinicService";
import { User, UserSex } from "../../src/model/User";
import { Clinic } from "../../src/model/Clinic";

jest.mock("../../src/repository/SecretaryRepository");
jest.mock("../../src/service/UserService");
jest.mock("../../src/service/ClinicService");

describe("Testes de SecretaryService", () => {
  let secretaryService: SecretaryService;
  let secretaryRepositoryMock: jest.Mocked<SecretaryRepository>;
  let mockSecretary: Secretary;
  let userServiceMock: jest.Mocked<UserService>;
  let clinicServiceMock: jest.Mocked<ClinicService>;
  let mockUser: User;
  let mockClinic: Clinic;

  beforeEach(() => {
    secretaryRepositoryMock = new SecretaryRepository() as jest.Mocked<SecretaryRepository>;
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    clinicServiceMock = new ClinicService() as jest.Mocked<ClinicService>;
    secretaryService = new SecretaryService(userServiceMock, clinicServiceMock, secretaryRepositoryMock);
    mockSecretary = Secretary.build({
      userId: 1,
      clinicId: 1,
      workingHours: "segunda a sexta 12:00 as 12:01",
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
    it("deve criar um novo secretário com sucesso", async () => {
      //mock das dependencias
      userServiceMock.getUserById.mockResolvedValue(mockUser);
      clinicServiceMock.getClinicById.mockResolvedValue(mockClinic);
      secretaryRepositoryMock.createSecretary.mockResolvedValue(mockSecretary);

      //chamada ao secretaryService
      const result = await secretaryService.createSecretary(
        1,
        1,
        "segunda a sexta 12:00 as 12:01",
      );

      //expect das dependencias
      expect(userServiceMock.getUserById).toHaveBeenCalledWith(1);
      expect(clinicServiceMock.getClinicById).toHaveBeenCalledWith(1);
      expect(secretaryRepositoryMock.createSecretary).toHaveBeenCalledWith(
        1,
        1,
        "segunda a sexta 12:00 as 12:01",
      );

      //expect do resultado
      expect(result).toBe(mockSecretary);
    });

    it("deve recuperar um secretário válido com sucesso", async () => {
      //mock das dependencias
      secretaryRepositoryMock.getSecretaryById.mockResolvedValue(mockSecretary);

      //chamada ao secretaryService
      const result = await secretaryService.getSecretaryById(1, 1);

      //expect das dependencias
      expect(secretaryRepositoryMock.getSecretaryById).toHaveBeenCalledWith(1, 1);

      //expect do resultado
      expect(result).toBe(mockSecretary);
    });

    it("deve retornar todos os secretários com sucesso", async () => {
      //mock das dependencias
      secretaryRepositoryMock.getAllSecretaries.mockResolvedValue( [ mockSecretary ] );

      //chamada ao secretaryService
      const result = await secretaryService.getAllSecretaries(1);

      //expect das dependencias
      expect(secretaryRepositoryMock.getAllSecretaries).toHaveBeenCalledWith(1);

      //expect do resultado
      expect(result).toEqual( [ mockSecretary ] );
    });

    it("deve atualizar um secretário válido com sucesso", async () => {
      //mock das dependencias
      const mockUpdatedSecretary = Secretary.build({
        userId: 1,
        clinicId: 1,
        workingHours: "HORARIO DE TRABALHO NAO INFORMADO",
      });
      secretaryRepositoryMock.updateSecretary.mockResolvedValue(mockUpdatedSecretary);
      userServiceMock.getUserById.mockResolvedValue(mockUser);
      clinicServiceMock.getClinicById.mockResolvedValue(mockClinic);

      //chamada ao secretaryService
      const result = await secretaryService.updateSecretary(
        1,
        1,
        {
          workingHours: ""
        }
      );

      //expect das dependencias
      expect(secretaryRepositoryMock.updateSecretary).toHaveBeenCalledWith(
        1,
        1,
        {
          workingHours: ""
        },
      );

      //expect do resultado
      expect(result).toBe(mockUpdatedSecretary);
    });

    it("deve remover um secretário com sucesso", async () => {
      //mock das dependencias
      secretaryRepositoryMock.deleteSecretary.mockResolvedValue(true);

      //chamada ao doctorService
      const result = await secretaryService.deleteSecretary(1, 1);

      //expect das dependencias
      expect(secretaryRepositoryMock.deleteSecretary).toHaveBeenCalledWith(1, 1);

      //expect do resultado
      expect(result).toBeTruthy();
    });

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um secretário com dados inválidos", async () => {
      userServiceMock.getUserById.mockResolvedValue(null);
      clinicServiceMock.getClinicById.mockResolvedValue(null);
      await expect(
        secretaryService.createSecretary(
          99,
          99,
          ""
        )
      ).rejects.toThrow(Error);
    });

    it("deve falhar em recuperar um secretário inexistente", async () => {
      //mock de dependencias
      secretaryRepositoryMock.getSecretaryById.mockResolvedValue(null);

      //chamada ao userService
      const result = await secretaryService.getSecretaryById(99, 99);

      //expect de dependencias
      expect(secretaryRepositoryMock.getSecretaryById).toHaveBeenCalledWith(99, 99);

      //expect do resultado
      expect(result).toBeNull();
    });

    it("deve falhar em recuperar todos os secretários devido a uma falha no banco de dados", async () => {
      //mock de dependencias
      secretaryRepositoryMock.getAllSecretaries.mockRejectedValue(new Error());
      
      //expect do resultado
      await expect(secretaryService.getAllSecretaries(99)).rejects.toThrow(Error);
    });

    it("deve falhar em atualizar um secretário com dados inválidos", async () => {
      userServiceMock.getUserById.mockResolvedValue(null);
      clinicServiceMock.getClinicById.mockResolvedValue(null);
      await expect(
        secretaryService.updateSecretary(
          99,
          99,
          {
            workingHours: "",
          },
        )
      ).rejects.toThrow(Error);
    });

    it("deve falhar em remover um secretário inexistente", async () => {
      //mock de dependencias
      secretaryRepositoryMock.deleteSecretary.mockResolvedValue(false);
      
      //chamada ao userService
      const result = await secretaryService.deleteSecretary(99, 99);
      
      //expect de dependencias
      expect(secretaryRepositoryMock.deleteSecretary).toHaveBeenCalledWith(99, 99);
      
      //expect do resultado
      expect(result).toBeFalsy();
    });

  });

});