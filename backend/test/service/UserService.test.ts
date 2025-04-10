import { UserService } from "../../src/service/UserService";
import { UserRepository } from "../../src/repository/UserRepository";
import { User, UserSex } from "../../src/model/User";
import * as bcrypt from "bcryptjs";

jest.mock("../../src/repository/UserRepository");
jest.mock("bcryptjs");

describe("Testes de UserService", () => {
  let userService: UserService;
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let mockUser: User;

  beforeEach(() => {
    userRepositoryMock = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepositoryMock);
    mockUser = User.build({
      id: 1,
      name: "Test User",
      email: "test@gmail.com",
      password: "HashedPassword!123",
      cpf: "12345678900",
      birthday: new Date("2000-01-01"),
      sex: UserSex.NAO_ESPECIFICADO,
      address: "rua dos bobos, 0",
      phone: "83987654321",
    })
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Testes de sucesso", () => {

    it("deve criar um novo usuário com sucesso", async () => {
      //mock de dependencias
      (bcrypt.hash as jest.Mock).mockResolvedValue("HashedPassword!123");
      userRepositoryMock.createUser.mockResolvedValue(mockUser);

      //chamada ao userService
      const result = await userService.createUser(
        "Test User",
        "test@gmail.com",
        "Password!123",
        "12345678900",
        new Date("2000-01-01"),
        UserSex.NAO_ESPECIFICADO,
        "rua dos bobos, 0",
        "83987654321",
      );

      //expects de dependencias
      expect(bcrypt.hash).toHaveBeenCalledWith("Password!123", 10);
      expect(userRepositoryMock.createUser).toHaveBeenCalledWith(
        "Test User",
        "test@gmail.com",
        "HashedPassword!123",
        "12345678900",
        new Date("2000-01-01"),
        UserSex.NAO_ESPECIFICADO,
        "rua dos bobos, 0",
        "83987654321",
      );

      //expect do resultado
      expect(result).toBe(mockUser);
    });

    /*
    it("deve recuperar um usuário válido com sucesso", async () => {

    });

    it("deve recuperar todos os usuários com sucesso", () => {

    });

    it("deve atualizar um usuário válido com sucesso", () => {

    });

    it("deve remover um usuário com sucesso", () => {

    });

  });

  describe("Testes de falha/exceção", () => {

    it("deve falhar em criar um usuário com dados inválidos", () => {

    });

    it("deve falhar em recuperar um usuário inexistente", () => {

    });

    it("deve falhar em recuperar todos os usuários devido a uma falha no banco de dados", () => {

    });

    it("deve falhar em atualizar um usuário com dados inválidos", () => {

    });

    it("deve falhar em remover um usuário inexistente", () => {

    });

    */
  });

});