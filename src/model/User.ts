import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export enum UserSex {
  MASCULINO = "MASCULINO",
  FEMININO = "FEMININO",
  NAO_ESPECIFICADO = "NAO-ESPECIFICADO"
}

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  birthday: Date;
  sex: UserSex;
  address: string;
  phone: string;
}

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserAttributes {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare cpf: string;
  declare birthday: Date;
  declare sex: UserSex;
  declare address: string;
  declare phone: string;
}

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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    //validação? acho que apenas na camada service, pois aqui está criptografado
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //validação de CPF real?
    //11 digitos e formato correto? (baseado em um calculo)
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },
    //data antes de hoje
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    sex: {
      type: DataTypes.ENUM(...Object.values(UserSex)),
      allowNull: false,
      defaultValue: UserSex.NAO_ESPECIFICADO,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    //validação de 10 ou 11 digitos
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);