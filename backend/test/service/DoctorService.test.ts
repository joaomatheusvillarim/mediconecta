import { DoctorService } from "../../src/service/DoctorService";
import { DoctorRepository } from "../../src/repository/DoctorRepository";
import { Doctor } from "../../src/model/Doctor";
import { UserService } from "../../src/service/UserService";
import { ClinicService } from "../../src/service/ClinicService";
import { User, UserSex } from "../../src/model/User";
import { Clinic } from "../../src/model/Clinic";

jest.mock("../../src/repository/DoctorRepository");
jest.mock("../../src/service/UserService");
jest.mock("../../src/service/ClinicService");


describe("Testes de DoctorService", () => {
  let doctorService: DoctorService;
  let doctorRepositoryMock: jest.Mocked<DoctorRepository>;
  let mockDoctor: Doctor;
  let userServiceMock: jest.Mocked<UserService>;
  let clinicServiceMock: jest.Mocked<ClinicService>;
  let mockUser: User;
  let mockClinic: Clinic;

  beforeEach(() => {
    doctorRepositoryMock = new DoctorRepository() as jest.Mocked<DoctorRepository>;
    userServiceMock = new UserService() as jest.Mocked<UserService>;
    clinicServiceMock = new ClinicService() as jest.Mocked<ClinicService>;
    doctorService = new DoctorService(userServiceMock, clinicServiceMock, doctorRepositoryMock);
    mockDoctor = Doctor.build({
      userId: 1,
      clinicId: 1,
      credentials: "1234PB",
      workingHours: "segunda a sexta 12:00 as 12:01",
      specialty: "bobologia",
      insurance: "bobomed",
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
    it("deve criar um novo médico com sucesso", async () => {
      //mock das dependencias
      userServiceMock.getUserById.mockResolvedValue(mockUser);
      clinicServiceMock.getClinicById.mockResolvedValue(mockClinic);
      doctorRepositoryMock.createDoctor.mockResolvedValue(mockDoctor);

      //chamada ao doctorService
      const result = await doctorService.createDoctor(
        1,
        1,
        "1234PB",
        "segunda a sexta 12:00 as 12:01",
        "bobologia",
        "bobomed",
      );

      //expect das dependencias
      expect(userServiceMock.getUserById).toHaveBeenCalledWith(1);
      expect(clinicServiceMock.getClinicById).toHaveBeenCalledWith(1);
      expect(doctorRepositoryMock.createDoctor).toHaveBeenCalledWith(
        1,
        1,
        "1234PB",
        "segunda a sexta 12:00 as 12:01",
        "bobologia",
        "bobomed",
      );

      //expect do resultado
      expect(result).toBe(mockDoctor);
    });

    it("deve recuperar um médico válido com sucesso", async () => {
      //mock das dependencias
      doctorRepositoryMock.getDoctorById.mockResolvedValue(mockDoctor);
  
      //chamada ao doctorService
      const result = await doctorService.getDoctorById(1, 1);

      //expect das dependencias
      expect(doctorRepositoryMock.getDoctorById).toHaveBeenCalledWith(1, 1);

      //expect do resultado
      expect(result).toBe(mockDoctor);
    });

    it("deve retornar todos os médicos com sucesso", async () => {
      //mock das dependencias
      doctorRepositoryMock.getAllDoctors.mockResolvedValue( [
        Doctor.build({
          userId: 1,
          clinicId: 1,
          credentials: "1234PB",
          workingHours: "segunda a sexta 12:00 as 12:01",
          specialty: "bobologia",
          insurance: "bobomed",
        })
      ] );

      //chamada ao doctorService
      const result = await doctorService.getAllDoctors(1);
      
      //expect das dependencias
      expect(doctorRepositoryMock.getAllDoctors).toHaveBeenCalledWith(1);

      //expect do resultado
      expect(result).toEqual( [ mockDoctor ] );
    });

    it("deve atualizar um médico válido com sucesso", async () => {
      //mock das dependencias
      const mockUpdatedDoctor = Doctor.build({
        userId: 1,
        clinicId: 1,
        credentials: "5678PB",
        workingHours: "segunda a sexta 12:00 as 12:02",
        specialty: "bobologia e patologia",
        insurance: "bobomed e unimed",
      });
      doctorRepositoryMock.updateDoctor.mockResolvedValue(mockUpdatedDoctor);

      //chamada ao doctorService
      const result = await doctorService.updateDoctor(1, 1, {
        credentials: "5678PB",
        workingHours: "segunda a sexta 12:00 as 12:02",
        specialty: "bobologia e patologia",
        insurance: "bobomed e unimed",
      });

      console.log(result);

      //expect das dependencias
      expect(doctorRepositoryMock.updateDoctor).toHaveBeenCalledWith(1, 1, {
        credentials: "5678PB",
        workingHours: "segunda a sexta 12:00 as 12:02",
        specialty: "bobologia e patologia",
        insurance: "bobomed e unimed",
      });

      //expect do resultado
      expect(result).toBe(mockUpdatedDoctor);
    });

    it("deve remover um médico com sucesso", async () => {
      //mock das dependencias
      doctorRepositoryMock.deleteDoctor.mockResolvedValue(true);

      //chamada ao doctorService
      const result = await doctorRepositoryMock.deleteDoctor(1, 1);

      //expect das dependencias
      expect(doctorRepositoryMock.deleteDoctor).toHaveBeenCalledWith(1, 1);

      //expect do resultado
      expect(result).toBeTruthy();
    });

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um médico com dados inválidos", async () => {
      userServiceMock.getUserById.mockResolvedValue(null);
      clinicServiceMock.getClinicById.mockResolvedValue(null);
      await expect(
        doctorService.createDoctor(
          99,
          99,
          "123aaaa",
          "",
          "",
          ""
        )
      ).rejects.toThrow(Error);
    });

    it("deve falhar em recuperar um médico inexistente", async () => {
      //mock de dependencias
      doctorRepositoryMock.getDoctorById.mockResolvedValue(null);

      //chamada ao userService
      const result = await doctorService.getDoctorById(99, 99);

      //expect de dependencias
      expect(doctorRepositoryMock.getDoctorById).toHaveBeenCalledWith(99, 99);

      //expect do resultado
      expect(result).toBeNull();
    });

    it("deve falhar em recuperar todos os médicos devido a uma falha no banco de dados", async () => {
      //mock de dependencias
      doctorRepositoryMock.getAllDoctors.mockRejectedValue(new Error());

      //expect do resultado
      await expect(doctorService.getAllDoctors(99)).rejects.toThrow(Error);
    });

    it("deve falhar em atualizar um médico com dados inválidos", async () => {
      userServiceMock.getUserById.mockResolvedValue(null);
      clinicServiceMock.getClinicById.mockResolvedValue(null);
      await expect(
        doctorService.updateDoctor(
          99,
          99,
          {
            credentials: "123aaaa",
            workingHours: "",
            specialty: "",
            insurance: "",
          },
        )
      ).rejects.toThrow(Error);
    });

    it("deve falhar em remover um médico inexistente", async () => {
      //mock de dependencias
      doctorRepositoryMock.deleteDoctor.mockResolvedValue(false);
      
      //chamada ao userService
      const result = await doctorService.deleteDoctor(99, 99);
      
      //expect de dependencias
      expect(doctorRepositoryMock.deleteDoctor).toHaveBeenCalledWith(99, 99);
      
      //expect do resultado
      expect(result).toBeFalsy();
    });

  });

});