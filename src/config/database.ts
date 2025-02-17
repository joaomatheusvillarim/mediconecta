import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as "postgres" | "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string,
  logging: false
});

export default sequelize;