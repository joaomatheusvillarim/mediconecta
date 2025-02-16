import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { Appointment } from './Appointment';
import { MedicalRecord } from './MedicalRecord';

interface DoctorAttributes {
  id: number;
  userId: number;
  crm: string;
  specialty: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DoctorCreationAttributes extends Optional<DoctorAttributes, 'id'> {}

class Doctor extends Model<DoctorAttributes, DoctorCreationAttributes> implements DoctorAttributes {
  public id!: number;
  public userId!: number;
  public crm!: string;
  public specialty!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Doctor.init(
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
        crm: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          },
        },
        specialty: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
      },
      {
        sequelize,
        tableName: 'doctors',
        timestamps: true,
        underscored: true,
      }
    );
  }
}

Doctor.initModel(sequelize);
Doctor.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });
Doctor.hasMany(MedicalRecord, { foreignKey: 'doctorId', as: 'medicalRecords' });

export { Doctor, DoctorCreationAttributes };


