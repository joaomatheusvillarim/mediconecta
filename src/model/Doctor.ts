import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

interface DoctorAttributes {
  id: number;
  userId: number;
  credentials: string;
  workingHours: string;
  specialty: string;
  insurance: string;
}

export class Doctor extends Model<InferAttributes<Doctor>, InferCreationAttributes<Doctor>> implements DoctorAttributes {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare credentials: string;
  declare workingHours: string;
  declare specialty: string;
  declare insurance: string;
  declare readonly user?: User;
}

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
      references: {
        model: User,
        key: "id",
      },
      unique: true,
    },
    credentials: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    workingHours: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    insurance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "doctors",
    timestamps: true,
    paranoid: true,
  }
);

Doctor.belongsTo(
  User, {
    foreignKey: "userId"
  }
)