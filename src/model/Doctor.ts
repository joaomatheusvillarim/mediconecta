import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

interface DoctorAttributes {
    doctorId: number;
    userId: number;
    crm: string;
}
export class Doctor extends Model<InferAttributes<Doctor>, InferCreationAttributes<Doctor>> implements DoctorAttributes {
    declare doctorId: CreationOptional<number>;
    declare userId: number;
    declare crm: string;
    declare readonly user?: User;
  }

Doctor.init(
    {
    doctorId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: "id",
        },
      },
      crm: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "doctors",
      timestamps: false,
    }
  );