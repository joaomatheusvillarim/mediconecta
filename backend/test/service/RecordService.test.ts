import { RecordService } from "../../src/service/RecordService";
import { RecordRepository } from "../../src/repository/RecordRepository";
import { Record } from "../../src/model/Record";

jest.mock("../../src/repository/RecordRepository");

describe("Testes de RecordService", () => {
  let recordService: RecordService;
  let recordRepositoryMock: jest.Mocked<RecordRepository>;
  let mockRecord: Record;

  beforeEach(() => {
    recordRepositoryMock = new RecordRepository() as jest.Mocked<RecordRepository>;
    recordService = new RecordService(recordRepositoryMock);
    mockRecord = Record.build({
      userId: 1,
      clinicId: 1,
      entries: [""],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Testes de sucesso", () => {
    it("deve criar um novo registro prontuário com sucesso", async () => {});

    it("deve recuperar um registro em prontuário válido com sucesso", async () => {});

    it("deve retornar todos os registros em um prontuário com sucesso", async () => {});

    it("deve atualizar um registro em prontuário válido com sucesso", async () => {});

    it("deve remover um registro em prontuário com sucesso", async () => {});

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um registro em prontuário com dados inválidos", async () => {});

    it("deve falhar em recuperar um registro prontuário inexistente", async () => {});

    it("deve falhar em recuperar todos os registros de um prontuário devido a uma falha no banco de dados", async () => {});

    it("deve falhar em atualizar um prontuário com dados inválidos", async () => {});

    it("deve falhar em remover um registro em prontuário inexistente", async () => {});

  });

});