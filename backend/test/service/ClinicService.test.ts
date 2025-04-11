import { ClinicService } from "../../src/service/ClinicService";
import { ClinicRepository } from "../../src/repository/ClinicRepository";
import { Clinic } from "../../src/model/Clinic";
import { UserService } from "../../src/service/UserService";

jest.mock("../../src/repository/ClinicRepository");

describe("Testes de ClinicService", () => {
  let clinicService: ClinicService;
  let clinicRepositoryMock: jest.Mocked<ClinicRepository>;
  let mockClinic: Clinic;

  beforeEach(() => {
    clinicRepositoryMock = new ClinicRepository() as jest.Mocked<ClinicRepository>;
    clinicService = new ClinicService(
      new UserService() as jest.Mocked<UserService>,
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
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Testes de sucesso", () => {
    it("deve criar um novo consultório com sucesso", async () => {});

    it("deve recuperar um consultório válido com sucesso", async () => {});

    it("deve retornar todos os consultórios com sucesso", async () => {});

    it("deve atualizar um consultório válido com sucesso", async () => {});

    it("deve remover um consultório com sucesso", async () => {});

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um consultório com dados inválidos", async () => {});

    it("deve falhar em recuperar um consultório inexistente", async () => {});

    it("deve falhar em recuperar todos os consultórios devido a uma falha no banco de dados", async () => {});

    it("deve falhar em atualizar um consultório com dados inválidos", async () => {});

    it("deve falhar em remover um consultório inexistente", async () => {});

  });

});