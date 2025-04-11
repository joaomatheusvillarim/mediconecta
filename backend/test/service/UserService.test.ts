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

    it("deve recuperar um usuário válido com sucesso", async () => {
      //mock de dependencias
      userRepositoryMock.getUserById.mockResolvedValue(mockUser);

      //chamada ao userService
      const result = await userService.getUserById(1);

      //expect de dependencias
      expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(1);

      //expect do resultado
      expect(result).toBe(mockUser);
    });
    
    it("deve recuperar todos os usuários com sucesso", async () => {
      //mock de dependencias
      userRepositoryMock.getAllUsers.mockResolvedValue( [mockUser] );

      //chamada ao userService
      const result = await userService.getAllUsers();
      
      //expect do resultado
      expect(result).toEqual([ mockUser ]);
    });
      
    it("deve atualizar um usuário válido com sucesso", async () => {
      //mock de dependencias
      (bcrypt.hash as jest.Mock).mockResolvedValue("NewHashedPassword!123");
      const mockUpdatedUser = User.build({
        id: 1,
        name: "Updated Test User",
        email: "updatedtest@gmail.com",
        password: "NewHashedPassword!123",
        cpf: "12345678900",
        birthday: new Date("2000-01-01"),
        sex: UserSex.NAO_ESPECIFICADO,
        address: "rua dos bobos, 0",
        phone: "83987654321",
      });
      userRepositoryMock.updateUser.mockResolvedValue(mockUpdatedUser);
      
      //chamada ao userService
      const result = await userService.updateUser(1, {
        name: "Updated Test User",
        email: "updatedtest@gmail.com",
        password: "NewPassword!123",
      });

      //expect de dependencias
      expect(bcrypt.hash).toHaveBeenCalledWith("NewPassword!123", 10);
      expect(userRepositoryMock.updateUser).toHaveBeenCalledWith(1, {
        name: "Updated Test User",
        email: "updatedtest@gmail.com",
        password: "NewHashedPassword!123",
      });

      //expect do resultado
      expect(result).toBe(mockUpdatedUser);
    });
      
    it("deve remover um usuário com sucesso", async () => {
      //mock de dependencias
      userRepositoryMock.deleteUser.mockResolvedValue(true);

      //chamada ao userService
      const result = await userService.deleteUser(1);

      //expect de dependencias
      expect(userRepositoryMock.deleteUser).toHaveBeenCalledWith(1);

      //expect do resultado
      expect(result).toBe(true);
    });
    
  });
    
  describe("Testes de falha/exceção", () => {
    
    it("deve falhar em criar um usuário com dados inválidos", async () => {
      await expect(
        userService.createUser(
          "Test User",
          "testuseremail",
          "Password!123",
          "12345678900",
          new Date("2000-01-01"),
          UserSex.NAO_ESPECIFICADO,
          "rua dos bobos, 0",
          "83987654321",
        )
      ).rejects.toThrow(Error);
    });
      
    it("deve falhar em recuperar um usuário inexistente", async () => {
      //mock de dependencias
      userRepositoryMock.getUserById.mockResolvedValue(null);

      //chamada ao userService
      const result = await userService.getUserById(99);

      //expect de dependencias
      expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(99);

      //expect do resultado
      expect(result).toBeNull();
    });
      
    it("deve falhar em recuperar todos os usuários devido a uma falha no banco de dados", async () => {
      //mock de dependencias
      userRepositoryMock.getAllUsers.mockRejectedValue(new Error());

      //expect do resultado
      await expect(userService.getAllUsers).rejects.toThrow(Error);
    });
      
    it("deve falhar em atualizar um usuário com dados inválidos", async () => {
      await expect(
        userService.updateUser(1, {
          name: "Invalid User",
          email: "user@",
          password: "123",
        })
      ).rejects.toThrow(Error);
    });


    it("deve falhar em remover um usuário inexistente", async () => {
      //mock de dependencias
      userRepositoryMock.deleteUser.mockResolvedValue(false);
      
      //chamada ao userService
      const result = await userService.deleteUser(99);
      
      //expect de dependencias
      expect(userRepositoryMock.deleteUser).toHaveBeenCalledWith(99);
      
      //expect do resultado
      expect(result).toBe(false);
    });

  });

});