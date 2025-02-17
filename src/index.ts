import * as express from "express";
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import { UserRepository } from "./repository/UserRepository";

dotenv.config();

const app = express();
app.use(express.json());

const userRepository = new UserRepository();

app.post("/users", async(request, response) => {
  try {
    const { name, email, password } = request.body;
    const user = await userRepository.createUser(name, email, password);
    response.json(user);
  } catch (error: any) {
    response.status(500).json(
      {
        message:"Erro ao criar o usuário",
        error: error.message
      }
    );
  }
});

app.get("/users", async (request, response) => {
  try {
    const users = await userRepository.getAllUsers();
    response.json(users);
  } catch (error: any) {
    response.status(500).json(
      {
        message: "Erro ao obter os usuários",
        error: error.message
      }
    );
  }
});

sequelize.sync({force: true}).then(() => {
  console.log("Banco de dados conectado");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
  console.error("Erro ao conectar o banco de dados", error);
});