import { AppointmentService } from "../../src/service/AppointmentService";
import { AppointmentRepository } from "../../src/repository/AppointmentRepository";
import { Appointment, AppointmentStatus } from "../../src/model/Appointment";

jest.mock("../../src/repository/AppointmentRepository");

describe("Testes de AppointmentService", () => {
  let appointmentService: AppointmentService;
  let appointmentRepositoryMock: jest.Mocked<AppointmentRepository>;
  let mockAppointment: Appointment;

  beforeEach(() => {
    appointmentRepositoryMock = new AppointmentRepository() as jest.Mocked<AppointmentRepository>;
    appointmentService = new AppointmentService(appointmentRepositoryMock);
    mockAppointment = Appointment.build({
      appointmentId: 1,
      clinicId: 1,
      patientId: 1,
      doctorId: 1,
      date: new Date("2025-01-01"),
      insurance: "bobomed",
      status: AppointmentStatus.NAOCONFIRMADO,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /*
  describe("Testes de sucesso", () => {
    it("deve criar um novo consulta com sucesso", async () => {});

    it("deve recuperar um consulta válido com sucesso", async () => {});

    it("deve retornar todos os consultas com sucesso", async () => {});

    it("deve atualizar um consulta válido com sucesso", async () => {});

    it("deve remover um consulta com sucesso", async () => {});

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um consulta com dados inválidos", async () => {});

    it("deve falhar em recuperar um consulta inexistente", async () => {});

    it("deve falhar em recuperar todos os consultas devido a uma falha no banco de dados", async () => {});

    it("deve falhar em atualizar um consulta com dados inválidos", async () => {});

    it("deve falhar em remover um consulta inexistente", async () => {});

  });
  */

});