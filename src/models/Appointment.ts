import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { Patient } from './Patient';
import { Doctor } from './Doctor';

interface AppointmentAttributes {
  id: number;
  patientId: number;
  doctorId: number;
  date: Date;
  time: string;
  isReturn: boolean;
  exam?: string;
  convenio: string;
  price: number;
  certificate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AppointmentCreationAttributes extends Optional<AppointmentAttributes, 'id'> {}

class Appointment extends Model<AppointmentAttributes, AppointmentCreationAttributes> implements AppointmentAttributes {
  public id!: number;
  public patientId!: number;
  public doctorId!: number;
  public date!: Date;
  public time!: string;
  public isReturn!: boolean;
  public exam?: string;
  public convenio!: string;
  public price!: number;
  public certificate?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Appointment.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        patientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        doctorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            isDate: true,
            isInFuture(value: Date) {
              if (new Date(value) <= new Date()) {
                throw new Error('A data da consulta deve ser no futuro.');
              }
            },
          },
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
        },
        convenio: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        certificate: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: 'appointments',
        timestamps: true,
        underscored: true, // Para compatibilidade com snake_case em PostgreSQL
      }
    );
  }
}

Appointment.initModel(sequelize);
Appointment.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

export { Appointment, AppointmentCreationAttributes };

