import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

interface SecretaryAttributes {
  secretaryId: number;
  userId: number;
}

export class Secretary extends Model<InferAttributes<Secretary>, InferCreationAttributes<Secretary>> implements SecretaryAttributes {
  declare secretaryId: CreationOptional<number>;
  declare userId: number;
  declare readonly user?: User;
}

Secretary.init(
  {
    secretaryId: {
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
  },
  {
    sequelize,
    tableName: "secretaries",
    timestamps: false,
  }
);

Secretary.belongsTo(
  User, {
    foreignKey: "userId",
  }
);