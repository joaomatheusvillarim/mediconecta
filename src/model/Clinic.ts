import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Doctor } from './Doctor';
import { User } from './User';

interface ClinicAttributes {
  clinicId: number;
  address: string;
  workingHours: string;
  specialties: string;
}

export class Clinic extends Model<InferAttributes<Clinic>, InferCreationAttributes<Clinic>> implements ClinicAttributes {
  declare clinicId: CreationOptional<number>;
  declare address: string;
  declare workingHours: string;
  declare specialties: string;
  declare doctors?: Doctor[];
  declare secretaries?: User[];
}

Clinic.init(
  {
    clinicId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workingHours: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialties: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "clinics",
    timestamps: false,
  }
);