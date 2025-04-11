import { SecretaryService } from "../../src/service/SecretaryService";
import { SecretaryRepository } from "../../src/repository/SecretaryRepository";
import { Secretary } from "../../src/model/Secretary";

jest.mock("../../src/repository/SecretaryRepository");

describe("Testes de SecretaryService", () => {
  let secretaryService: SecretaryService;
  let secretaryRepositoryMock: jest.Mocked<SecretaryRepository>;
  let mockSecretary: Secretary;

  beforeEach(() => {
    secretaryRepositoryMock = new SecretaryRepository() as jest.Mocked<SecretaryRepository>;
    secretaryService = new SecretaryService(secretaryRepositoryMock);
    mockSecretary = Secretary.build({
      userId: 1,
      clinicId: 1,
      workingHours: "",
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /*
  describe("Testes de sucesso", () => {
    it("deve criar um novo secretário com sucesso", async () => {});

    it("deve recuperar um secretário válido com sucesso", async () => {});

    it("deve retornar todos os secretários com sucesso", async () => {});

    it("deve atualizar um secretário válido com sucesso", async () => {});

    it("deve remover um secretário com sucesso", async () => {});

  });

  describe("Testes de falha e exceção", () => {
    it("deve falhar em criar um secretário com dados inválidos", async () => {});

    it("deve falhar em recuperar um secretário inexistente", async () => {});

    it("deve falhar em recuperar todos os secretários devido a uma falha no banco de dados", async () => {});

    it("deve falhar em atualizar um secretário com dados inválidos", async () => {});

    it("deve falhar em remover um secretário inexistente", async () => {});

  });
  */

});