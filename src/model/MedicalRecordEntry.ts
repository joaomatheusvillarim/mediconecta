import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, INTEGER } from 'sequelize';
import sequelize from '../config/database';
import { Patient } from './Patient';
import { Doctor } from './Doctor';
import { MedicalRecord } from "./MedicalRecord";

interface MedicalRecordEntryAttributes {
  medicalRecordEntryId: number;
  patientId: number;
  doctorId: number;
  date: Date;
  age: number;
  height: number;
  weight: number;
  bloodPressure: string;
  heartRate: string;
  medications: string;
  conditions: string;
  surgeries: string;
  comments: string;
}

export class MedicalRecordEntry extends Model<InferAttributes<MedicalRecordEntry>, InferCreationAttributes<MedicalRecordEntry>> implements MedicalRecordEntry {
  declare medicalRecordEntryId: CreationOptional<number>;
  declare patientId: number;
  declare doctorId: number;
  declare date: Date;
  declare age: number;
  declare height: CreationOptional<number>;
  declare weight: CreationOptional<number>;
  declare bloodPressure: CreationOptional<string>;
  declare heartRate: CreationOptional<string>;
  declare medications: CreationOptional<string>;
  declare conditions: CreationOptional<string>;
  declare surgeries: CreationOptional<string>;
  declare comments: CreationOptional<string>;
}

MedicalRecordEntry.init(
  {
    medicalRecordEntryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: "patientId",
      }
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Doctor,
        key: "doctorId",
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    bloodPressure: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    heartRate: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    medications: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    conditions: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    surgeries: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    comments: {
      type: DataTypes.STRING,
      defaultValue: "",
    },

  },
  {
    sequelize,
    tableName: "medical_record_entries",
    timestamps: false,
  },
);

MedicalRecordEntry.belongsTo(
  MedicalRecord, {
    foreignKey: "bookId",
  }
);