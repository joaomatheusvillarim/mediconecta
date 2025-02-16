import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { Patient } from './Patient';
import { Doctor } from './Doctor';

interface MedicalRecordAttributes {
  id: number;
  patientId: number;
  doctorId: number;
  notes: string;
  surgeries?: string;
  conditions?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MedicalRecordCreationAttributes extends Optional<MedicalRecordAttributes, 'id'> {}

class MedicalRecord extends Model<MedicalRecordAttributes, MedicalRecordCreationAttributes> implements MedicalRecordAttributes {
  public id!: number;
  public patientId!: number;
  public doctorId!: number;
  public notes!: string;
  public surgeries?: string;
  public conditions?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    MedicalRecord.init(
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
        notes: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        surgeries: {
          type: DataTypes.STRING,
        },
        conditions: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: 'medical_records',
        timestamps: true,
        underscored: true, // Compatibilidade com PostgreSQL
      }
    );
  }
}

MedicalRecord.initModel(sequelize);
MedicalRecord.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
MedicalRecord.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

export { MedicalRecord, MedicalRecordCreationAttributes};

