import { AnnouncementService } from "../../src/service/AnnouncementService";
import { AnnouncementRepository } from "../../src/repository/AnnouncementRepository";
import { Announcement } from "../../src/model/Announcement";

jest.mock("../../src/repository/AnnouncementRepository");

describe("Testes de AnnouncementService", () => {
  let announcementService: AnnouncementService;
  let announcementRepositoryMock: jest.Mocked<AnnouncementRepository>;
  let mockAnnouncement: Announcement;

  beforeEach(() => {
    announcementRepositoryMock = new AnnouncementRepository() as jest.Mocked<AnnouncementRepository>;
    announcementService = new AnnouncementService(announcementRepositoryMock);
    mockAnnouncement = Announcement.build({
      announcementId: 1,
      clinicId: 1,
      authorId: 1,
      title: "Test Announcement",
      text: "Avisamos a todos os pacientes que",
      posted: new Date("2025-01-01"),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /*
  describe("Testes de sucesso", () => {
    it("deve criar um novo aviso com sucesso", async () => {});

    it("deve recuperar um aviso válido com sucesso", async () => {});

    it("deve retornar todos os avisos com sucesso", async () => {});

    it("deve atualizar um aviso válido com sucesso", async () => {});

    it("deve remover um aviso com sucesso", async () => {});

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um aviso com dados inválidos", async () => {});

    it("deve falhar em recuperar um aviso inexistente", async () => {});

    it("deve falhar em recuperar todos os avisos devido a uma falha no banco de dados", async () => {});

    it("deve falhar em atualizar um aviso com dados inválidos", async () => {});

    it("deve falhar em remover um aviso inexistente", async () => {});

  });
  */

});