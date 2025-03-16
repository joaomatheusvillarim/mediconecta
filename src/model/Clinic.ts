import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

interface ClinicAttributes {
  id: number;
  adminId: number;
  name: string;
  address: string;
  workingHours: string;
  specialties: string;
  phone: string;
  email: string;
}

interface ClinicCreationAttributes extends Optional<ClinicAttributes, "id"> {}

export class Clinic extends Model<ClinicAttributes, ClinicCreationAttributes> implements ClinicAttributes {
  public id!: number;
  public adminId!: number;
  public name!: string;
  public address!: string;
  public workingHours!: string;
  public specialties!: string;
  public phone!: string;
  public email!: string;
}

Clinic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id"
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    workingHours: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    specialties: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^(\d{2})9?\d{8}$/,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    tableName: "clinics",
    timestamps: true,
    paranoid: true,
  },
);

Clinic.belongsTo(
  User, {
    foreignKey: "id",
  },
);