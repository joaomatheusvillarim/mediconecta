import { DataTypes, Model, Optional } from 'sequelize';
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

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public cpf!: string;
  public birthday!: Date;
  public sex!: UserSex;
  public address!: string;
  public phone!: string;
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      }
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^\d{11}$/,
      },
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        validateBirthday(birthday: Date) {
          const today = new Date();
          if (birthday > today) throw new Error();
        }
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
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^(\d{2})9?\d{8}$/,
      },
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
  }
);