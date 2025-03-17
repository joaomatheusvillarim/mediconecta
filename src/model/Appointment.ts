import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { Clinic } from './Clinic';
import { User } from './User';

export enum AppointmentStatus {
  NAOCONFIRMADO = "NAO CONFIRMADO",
  CONFIRMADO = "CONFIRMADO",
}

interface AppointmentAttributes {
  appointmentId: number;
  clinicId: number;
  patientId: number;
  doctorId: number;
  date: Date;
  insurance: string;
  status: AppointmentStatus;
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, "appointmentId"> {}

export class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttributes> implements AppointmentAttributes {
  public appointmentId!: number;
  public clinicId!: number;
  public patientId!: number;
  public doctorId!: number;
  public date!: Date;
  public insurance!: string;
  public status!: AppointmentStatus;
}

Appointment.init(
  {
    appointmentId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    clinicId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clinic,
        key: "id",
      }
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        validateAppointmentDate(date: Date) {
          const today = new Date();
          if (date > today) throw new Error();
        }
      }
    },
    insurance: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM(...Object.values(AppointmentStatus)),
      allowNull: false,
      defaultValue: AppointmentStatus.NAOCONFIRMADO,
    },
  },
  {
    sequelize,
    tableName: "appointments",
    timestamps: false,
  }
);

Appointment.belongsTo(
  Clinic, {
    foreignKey: 'clinicId',
});
