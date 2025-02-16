import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id: number;
  name: string;
  dateOfBirth: Date;
  cpf: string;
  role: 'paciente' | 'secretario' | 'medico';
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public dateOfBirth!: Date;
  public cpf!: string;
  public role!: 'paciente' | 'secretario' | 'medico';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        dateOfBirth: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            isDate: true,
          },
        },
        cpf: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            is: /^\d{11}$/, // Valida se o CPF tem exatamente 11 dígitos
            notEmpty: true,
          },
        },
        role: {
          type: DataTypes.ENUM('paciente', 'secretario', 'medico'),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true, // Compatibilidade com PostgreSQL
      }
    );
  }
}

User.initModel(sequelize);

export { User, UserCreationAttributes};


