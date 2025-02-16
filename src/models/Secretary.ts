import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

interface SecretaryAttributes {
  id: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SecretaryCreationAttributes extends Optional<SecretaryAttributes, 'id'> {}

class Secretary extends Model<SecretaryAttributes, SecretaryCreationAttributes> implements SecretaryAttributes {
  public id!: number;
  public userId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
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
        },
      },
      {
        sequelize,
        tableName: 'secretaries',
        timestamps: true,
      }
    );
  }
}

Secretary.initModel(sequelize);
Secretary.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { Secretary, SecretaryCreationAttributes };
