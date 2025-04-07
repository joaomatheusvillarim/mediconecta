import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Clinic } from './Clinic';

interface SecretaryAttributes {
  userId: number;
  clinicId: number;
  workingHours: string;
}

interface SecretaryCreationAttributes extends Optional<SecretaryAttributes, "workingHours"> {}

export class Secretary extends Model<SecretaryAttributes, SecretaryCreationAttributes> implements SecretaryAttributes {
  public userId!: number;
  public clinicId!: number;
  public workingHours!: string;
}

Secretary.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      unique: true,
    },
    clinicId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clinic,
        key: 'id',
      },
    },
    workingHours: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "HORARIO DE TRABALHO NAO INFORMADO",
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: "secretaries",
    timestamps: false,
  }
);

Secretary.belongsTo(
  User, { 
    foreignKey: 'userId' 
  }
);
Secretary.belongsTo(
  Clinic, { 
    foreignKey: 'clinicId' 
  }
);