import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Doctor } from './Doctor';
import { User } from './User';
import { Patient } from './Patient';
import { Secretary } from './Secretary';

interface ClinicAttributes {
  id: number;
  admin: number;
  name: string;
  address: string;
  workingHours: string;
  specialties: string;
  phone: string;
  email: string;
  patients: Patient[];
  doctors: Doctor[];
  secretaries: Secretary[];
}

export class Clinic extends Model<InferAttributes<Clinic>, InferCreationAttributes<Clinic>> implements ClinicAttributes {
  declare id: CreationOptional<number>;
  declare admin: number;
  declare name: string;
  declare address: string;
  declare workingHours: string;
  declare specialties: string;
  declare phone: string;
  declare email: string;
  declare patients: CreationOptional<Patient[]>;
  declare doctors: CreationOptional<Doctor[]>;
  declare secretaries: CreationOptional<Secretary[]>;
}

Clinic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
      },
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    patients: {
      type: DataTypes.ARRAY,
      allowNull: false,
      defaultValue: {},
    },
    doctors: {
      type: DataTypes.ARRAY,
      allowNull: false,
      defaultValue: {},
    },
    secretaries: {
      type: DataTypes.ARRAY,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    sequelize,
    tableName: "clinics",
    timestamps: true,
    paranoid: true,
  }
);