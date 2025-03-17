import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Clinic } from './Clinic';

interface AnnouncementAttributes {
  announcementId: number;
  authorId: number;
  clinicId: number;
  title: string;
  text: string;
  posted: Date;
}

export class Announcement extends Model<InferAttributes<Announcement>, InferCreationAttributes<Announcement>> implements AnnouncementAttributes {
  declare announcementId: CreationOptional<number>;
  declare authorId: number;
  declare clinicId: number;
  declare title: string;
  declare text: string;
  declare posted: Date;
}

Announcement.init(
  {
    announcementId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    clinicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clinic,
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posted: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Announcement',
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
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
