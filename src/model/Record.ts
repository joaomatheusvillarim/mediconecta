import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Patient } from './Patient';

interface RecordAttributes {
  id: number;
  patientId: number;
  entries: JSON[];
}

export class Record extends Model<InferAttributes<Record>, InferCreationAttributes<Record>> implements RecordAttributes {
  declare id: CreationOptional<number>;
  declare patientId: number;
  declare entries: CreationOptional<JSON[]>;
}

Record.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: Patient,
        key: "patientId"
      },
    },
    entries: {
      type: DataTypes.ARRAY,
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    sequelize,
    tableName: "records",
    timestamps: true,
    paranoid: true,
  },
);

Record.belongsTo(
  Patient, {
    foreignKey: "patientId",
  }
)