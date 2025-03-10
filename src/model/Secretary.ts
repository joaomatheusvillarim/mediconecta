import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

interface SecretaryAttributes {
  id: number;
  userId: number;
  workingHours: string;
}

export class Secretary extends Model<InferAttributes<Secretary>, InferCreationAttributes<Secretary>> implements SecretaryAttributes {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare workingHours: string;
  declare readonly user?: User;
}

Secretary.init(
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
    workingHours: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "secretaries",
    timestamps: true,
    paranoid: true,
  }
);

Secretary.belongsTo(
  User, {
    foreignKey: "userId",
  }
);