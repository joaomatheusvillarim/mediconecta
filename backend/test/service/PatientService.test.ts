import { PatientService } from "../../src/service/PatientService";
import { PatientRepository } from "../../src/repository/PatientRepository";
import { Patient } from "../../src/model/Patient";

jest.mock("../../src/repository/PatientRepository");

describe("Testes de PatientService", () => {
  let patientService: PatientService;
  let patientRepositoryMock: jest.Mocked<PatientRepository>;
  let mockPatient: Patient;

  beforeEach(() => {
    patientRepositoryMock = new PatientRepository() as jest.Mocked<PatientRepository>;
    patientService = new PatientService(patientRepositoryMock);
    mockPatient = Patient.build({
      userId: 1,
      clinicId: 1,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Testes de sucesso", () => {
    it("deve criar um novo paciente com sucesso", async () => {});

    it("deve recuperar um paciente válido com sucesso", async () => {});

    it("deve retornar todos os pacientes com sucesso", async () => {});

    it("deve atualizar um paciente válido com sucesso", async () => {});

    it("deve remover um paciente com sucesso", async () => {});

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um paciente com dados inválidos", async () => {});

    it("deve falhar em recuperar um paciente inexistente", async () => {});

    it("deve falhar em recuperar todos os pacientes devido a uma falha no banco de dados", async () => {});

    it("deve falhar em atualizar um paciente com dados inválidos", async () => {});

    it("deve falhar em remover um paciente inexistente", async () => {});

  });

});