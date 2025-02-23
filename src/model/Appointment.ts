import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Clinic } from './Clinic';

interface AppointmentAttributes {
  appointmentId: number;
  clinicId: number;
  date: Date;
  time: string;
  isReturn: boolean;
  exam: string;
  insurance: string;
  price: number;
  hasMedicalCertificate: boolean;
}

export class Appointment extends Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> implements AppointmentAttributes {
  declare appointmentId: CreationOptional<number>;
  declare clinicId: number;
  declare date: Date;
  declare time: string;
  declare isReturn: boolean;
  declare exam: string;
  declare insurance: string;
  declare price: number;
  declare hasMedicalCertificate: boolean;
}

Appointment.init(
  {
    appointmentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isReturn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    exam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    insurance: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    hasMedicalCertificate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "appointments",
    timestamps: false,
  }
);

Appointment.belongsTo(Clinic, {
    foreignKey: 'clinicId',
    as: 'clinic',
});
