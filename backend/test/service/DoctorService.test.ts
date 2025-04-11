import { DoctorService } from "../../src/service/DoctorService";
import { DoctorRepository } from "../../src/repository/DoctorRepository";
import { Doctor } from "../../src/model/Doctor";

jest.mock("../../src/repository/DoctorRepository");

describe("Testes de DoctorService", () => {
  let doctorService: DoctorService;
  let doctorRepositoryMock: jest.Mocked<DoctorRepository>;
  let mockDoctor: Doctor;

  beforeEach(() => {
    doctorRepositoryMock = new DoctorRepository() as jest.Mocked<DoctorRepository>;
    doctorService = new DoctorService(doctorRepositoryMock);
    mockDoctor = Doctor.build({
      userId: 1,
      clinicId: 1,
      credentials: "",
      workingHours: "",
      specialty: "",
      insurance: "",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /*
  describe("Testes de sucesso", () => {
    it("deve criar um novo médico com sucesso", async () => {});

    it("deve recuperar um médico válido com sucesso", async () => {});

    it("deve retornar todos os médicos com sucesso", async () => {});

    it("deve atualizar um médico válido com sucesso", async () => {});

    it("deve remover um médico com sucesso", async () => {});

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um médico com dados inválidos", async () => {});

    it("deve falhar em recuperar um médico inexistente", async () => {});

    it("deve falhar em recuperar todos os médicos devido a uma falha no banco de dados", async () => {});

    it("deve falhar em atualizar um médico com dados inválidos", async () => {});

    it("deve falhar em remover um médico inexistente", async () => {});

  });
  */

});