import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { MedicalRecordEntry } from './MedicalRecordEntry';
import { Patient } from './Patient';

interface MedicalRecordAttributes {
  medicalRecordId: number;
  patientId: number;
  entries: MedicalRecordEntry[];
}

export class MedicalRecord extends Model<InferAttributes<MedicalRecord>, InferCreationAttributes<MedicalRecord>> implements MedicalRecordAttributes {
  declare medicalRecordId: CreationOptional<number>;
  declare patientId: number;
  declare entries: CreationOptional<MedicalRecordEntry[]>;
}

MedicalRecord.init(
  {
    medicalRecordId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Patient,
        key: "patientId"
      },
    },
    entries: {
      type: DataTypes.ARRAY,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "medical_records",
    timestamps: false,
  },
);

MedicalRecord.belongsTo(
  Patient, {
    foreignKey: "patientId",
  }
)