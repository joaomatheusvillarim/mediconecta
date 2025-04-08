import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Clinic } from './Clinic';

interface RecordAttributes {
  userId: number;
  clinicId: number;
  entries: string[];
}

interface RecordCreationAttributes extends Optional<RecordAttributes, "entries"> {}

export class Record extends Model<RecordAttributes, RecordCreationAttributes> implements RecordAttributes {
  public readonly userId!: number;
  public readonly clinicId!: number;
  public entries!: string[];
}

Record.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    clinicId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clinic,
        key: "id",
      },
    },
    entries: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    sequelize,
    tableName: "records",
    timestamps: false,
  },
);

Record.belongsTo(
  User, {
    foreignKey: "userId",
  }
);
Record.belongsTo(
  Clinic, {
    foreignKey: "clinicId"
  }
);