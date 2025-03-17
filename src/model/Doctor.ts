import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Clinic } from './Clinic';

interface DoctorAttributes {
  userId: number;
  clinicId: number;
  credentials: string;
  workingHours: string;
  specialty: string;
  insurance: string;
}

interface DoctorCreationAttributes extends Optional<DoctorAttributes, "workingHours" | "insurance"> {}

export class Doctor extends Model<DoctorAttributes, DoctorCreationAttributes> implements DoctorAttributes {
  public readonly userId!: number;
  public readonly clinicId!: number;
  public credentials!: string;
  public workingHours!: string;
  public specialty!: string;
  public insurance!: string;
}

Doctor.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      unique: true,
    },
    clinicId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clinic,
        key: "id",
      }
    },
    credentials: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workingHours: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "HORARIO DE TRABALHO NAO INFORMADO",
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
    insurance: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "NAO CONVENIADO",
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: "doctors",
    timestamps: false,
  }
);

Doctor.belongsTo(
  User, {
    foreignKey: "userId"
  }
);
Doctor.belongsTo(
  Clinic, {
    foreignKey: "clinicId"
  }
);