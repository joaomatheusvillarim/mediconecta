import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Appointment } from './Appointment';
import { MedicalRecord } from './MedicalRecord';
import { Document } from './Document';
import { Note } from './Note';

interface PatientAttributes {
  id: number;
  userId: number;
  convenio: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PatientCreationAttributes extends Optional<PatientAttributes, 'id'> {}

class Patient extends Model<PatientAttributes, PatientCreationAttributes> implements PatientAttributes {
  public id!: number;
  public userId!: number;
  public convenio!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Patient.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        convenio: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        sequelize,
        tableName: 'patients',
        timestamps: true,
        underscored: true, // Compatibilidade com PostgreSQL
      }
    );
  }
}

Patient.initModel(sequelize);
Patient.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Patient.hasMany(Appointment, { foreignKey: 'patientId', as: 'appointments' });
Patient.hasMany(MedicalRecord, { foreignKey: 'patientId', as: 'medicalRecords' });
Patient.hasMany(Document, { foreignKey: 'patientId', as: 'documents' });
Patient.hasMany(Note, { foreignKey: 'patientId', as: 'notes' });

export { Patient, PatientCreationAttributes };

