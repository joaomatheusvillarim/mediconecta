import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Clinic } from './Clinic';

interface AnnouncementAttributes {
  announcementId: number;
  userId: number;
  clinicId: number;
  title: string;
  body: string;
  timestamp: Date;
}

export class Announcement extends Model<InferAttributes<Announcement>, InferCreationAttributes<Announcement>> implements AnnouncementAttributes {
  declare announcementId: CreationOptional<number>;
  declare userId: number;
  declare clinicId: number;
  declare title: string;
  declare body: string;
  declare timestamp: Date;
}

Announcement.init(
  {
    announcementId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "announcements",
    timestamps: false,
  }
);

Announcement.belongsTo(Clinic, {
    foreignKey: 'clinicId',
    as: 'clinic',
});
