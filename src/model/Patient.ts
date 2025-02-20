import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

interface PatientAttributes {
  id: number;
  userId: number;
}

export class Patient extends Model<InferAttributes<Patient>, InferCreationAttributes<Patient>> implements PatientAttributes {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare readonly user?: User;
}

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
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "patients",
    timestamps: false,
  }
);