import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import { User } from '../models/User';
import { Patient } from '../models/Patient';
import { Doctor } from '../models/Doctor';
import { Secretary } from '../models/Secretary';
import { Appointment } from '../models/Appointment';
import { MedicalRecord } from '../models/MedicalRecord';
import { Document } from '../models/Document';
import { Note } from '../models/Note';
import { Notice } from '../models/Notice';

dotenv.config();

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT as 'postgres' | 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
});

async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true }); // Ajusta as tabelas existentes
    console.log('Banco de dados sincronizado com sucesso.');
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
  }
}

syncDatabase();

export default sequelize;