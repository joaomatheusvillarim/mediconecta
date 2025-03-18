import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Clinic } from './Clinic';

interface AnnouncementAttributes {
  announcementId: number;
  clinicId: number;
  authorId: number;
  title: string;
  text: string;
  posted: Date;
}

interface AnnouncementCreationAttributes extends Optional<AnnouncementAttributes, "announcementId" | "posted"> {}

export class Announcement extends Model<AnnouncementAttributes, AnnouncementCreationAttributes> implements AnnouncementAttributes {
  public announcementId!: number;
  public clinicId!: number;
  public authorId!: number;
  public title!: string;
  public text!: string;
  public posted!: Date;
}

Announcement.init(
  {
    announcementId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    posted: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'announcements',
    timestamps: false,
  }
);

Announcement.belongsTo(
  User, { 
    foreignKey: 'authorId' 
  }
);
Announcement.belongsTo(
  Clinic, { 
    foreignKey: 'clinicId' 
  }
);
