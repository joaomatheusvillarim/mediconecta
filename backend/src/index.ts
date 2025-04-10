import "reflect-metadata";
import express from "express";
import cors from 'cors';
import * as dotenv from "dotenv";
import sequelize from "./config/database";
import userRoutes from "./routes/UserRoutes";
import patientRoutes from "./routes/PatientRoutes";
import doctorRoutes from "./routes/DoctorRoutes"
import clinicRoutes from "./routes/ClinicRoutes";
import appointmentRoutes from "./routes/AppointmentRoutes";
import announcementRoutes from "./routes/AnnouncementRoutes";
import secretaryRoutes from "./routes/SecretaryRoutes";
import medicalRecordRoutes from "./routes/RecordRoutes";
import { setupSwagger } from "./config/swagger";
import authRoutes from "./routes/AuthRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(patientRoutes);
app.use(doctorRoutes);
app.use(clinicRoutes);
app.use(appointmentRoutes);
app.use(announcementRoutes);
app.use(secretaryRoutes);
app.use(medicalRecordRoutes);
app.use("/auth", authRoutes);

setupSwagger(app);

sequelize.sync({ force: true }).then(() => {
  console.log("Banco de dados conectado");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((error) => {
  console.error("Erro ao conectar o banco de dados", error);
});