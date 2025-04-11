import { ClinicService } from "../../src/service/ClinicService";
import { ClinicRepository } from "../../src/repository/ClinicRepository";
import { Clinic } from "../../src/model/Clinic";
import { UserService } from "../../src/service/UserService";
import { User, UserSex } from "../../src/model/User";

jest.mock("../../src/repository/ClinicRepository");
jest.mock("../../src/service/UserService");

describe("Testes de ClinicService", () => {
  let clinicService: ClinicService;
  let clinicRepositoryMock: jest.Mocked<ClinicRepository>;
  let mockClinic: Clinic;
  let userServiceMock: jest.Mocked<UserService>;
  let mockUser: User;

  beforeEach(() => {
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    clinicRepositoryMock = new ClinicRepository() as jest.Mocked<ClinicRepository>;
    clinicService = new ClinicService(
      userServiceMock,
      clinicRepositoryMock
    );
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
    it("deve criar um novo consultório com sucesso", async () => {
      //mock de dependencias
      userServiceMock.getUserById.mockResolvedValue(mockUser);
      clinicRepositoryMock.createClinic.mockResolvedValue(mockClinic);

      //chamada ao clinicService
      const result = await clinicService.createClinic(
        1,
        "Test Clinic",
        "rua dos bobos, 0",
        "segunda a sexta 12:00 as 12:01",
        "bobologia",
        "83987654321",
        "testclinic@gmail.com",
      );

      //expects de dependencia
      expect(userServiceMock.getUserById).toHaveBeenCalledWith(1);
      expect(clinicRepositoryMock.createClinic).toHaveBeenCalledWith(
        1,
        "Test Clinic",
        "rua dos bobos, 0",
        "segunda a sexta 12:00 as 12:01",
        "bobologia",
        "83987654321",
        "testclinic@gmail.com",
      );

      //expect do resultado
      expect(result).toBe(mockClinic);
    });

    it("deve recuperar um consultório válido com sucesso", async () => {
      //mock de dependencias
      clinicRepositoryMock.getClinicById.mockResolvedValue(mockClinic);

      //chamada ao clinicService
      const result = await clinicService.getClinicById(1);

      //expects de dependencia
      expect(clinicRepositoryMock.getClinicById).toHaveBeenCalledWith(1);

      //expect do resultado
      expect(result).toBe(mockClinic);
    });

    it("deve retornar todos os consultórios com sucesso", async () => {
      //mock de dependencias
      clinicRepositoryMock.getAllClinics.mockResolvedValue( [ mockClinic ] );

      //chamada ao clinicService
      const result = await clinicService.getAllClinics();

      //expect do resultado
      expect(result).toEqual( [ mockClinic ] );
    });

    it("deve atualizar um consultório válido com sucesso", async () => {
      //mock de dependencias
      const mockUpdatedClinic = Clinic.build({
        id: 1,
        adminId: 1,
        name: "Updated Test Clinic",
        address: "rua dos bobos, 9999",
        workingHours: "segunda a sexta 12:00 as 12:02",
        specialties: "bobologia e harmonizacao facial",
        phone: "83987654320",
        email: "updatedtestclinic@gmail.com",
      });
      clinicRepositoryMock.updateClinic.mockResolvedValue(mockUpdatedClinic);

      //chamada ao clinicService
      const result = await clinicService.updateClinic(1, {
        name: "Updated Test Clinic",
        address: "rua dos bobos, 9999",
        workingHours: "segunda a sexta 12:00 as 12:02",
        specialties: "bobologia e harmonizacao facial",
        phone: "83987654320",
        email: "updatedtestclinic@gmail.com",
      });

      //expects de dependencia
      expect(clinicRepositoryMock.updateClinic).toHaveBeenCalledWith(1, {
        name: "Updated Test Clinic",
        address: "rua dos bobos, 9999",
        workingHours: "segunda a sexta 12:00 as 12:02",
        specialties: "bobologia e harmonizacao facial",
        phone: "83987654320",
        email: "updatedtestclinic@gmail.com"
      });

      //expect do resultado
      expect(result).toBe(mockUpdatedClinic);
    });

    it("deve remover um consultório com sucesso", async () => {
      //mock de dependencias
      clinicRepositoryMock.deleteClinic.mockResolvedValue(true);

      //chamada ao clinicService
      const result = await clinicService.deleteClinic(1);

      //expects de dependencia
      expect(clinicRepositoryMock.deleteClinic).toHaveBeenCalledWith(1);

      //expect do resultado
      expect(result).toBeTruthy();
    });

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um consultório com dados inválidos", async () => {
      await expect(
        clinicService.createClinic(
          1,
          "",
          "",
          "",
          "",
          "083987654321",
          "testclinicgmail.com",
        )
      ).rejects.toThrow(Error);
    });

    it("deve falhar em recuperar um consultório inexistente", async () => {
      //mock de dependencias
      clinicRepositoryMock.getClinicById.mockResolvedValue(null);

      //chamada ao clinicService
      const result = await clinicService.getClinicById(99);

      //expects de dependencia
      expect(clinicRepositoryMock.getClinicById).toHaveBeenCalledWith(99);
      
      //expect do resultado
      expect(result).toBeNull();
    });

    it("deve falhar em recuperar todos os consultórios devido a uma falha no banco de dados", async () => {
      //mock de dependencias
      clinicRepositoryMock.getClinicById.mockRejectedValue(new Error());

      //chamada ao clinicService
      await expect(clinicService.getClinicById).rejects.toThrow(Error);
    });

    it("deve falhar em atualizar um consultório com dados inválidos", async () => {
      userServiceMock.getUserById.mockResolvedValue(null);

      await expect(
        clinicService.updateClinic(1, {
          adminId: 99,
          phone: "8398765432000",
          email: "updatedtestclinicgmail.com",
        })
      ).rejects.toThrow(Error);
    });

    it("deve falhar em remover um consultório inexistente", async () => {
      //mock de dependencias
      clinicRepositoryMock.deleteClinic.mockResolvedValue(false);

      //chamada ao clinicService
      const result = await clinicService.deleteClinic(99);
      
      //expects de dependencia
      expect(clinicRepositoryMock.deleteClinic).toHaveBeenCalledWith(99);

      //expect do resultado
      expect(result).toBeFalsy();
    });

  });

});