import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

interface NoticeAttributes {
  id: number;
  title: string;
  body: string;
  authorId: number;
  date: Date;
}

interface NoticeCreationAttributes extends Optional<NoticeAttributes, 'id'> {}

class Notice extends Model<NoticeAttributes, NoticeCreationAttributes> implements NoticeAttributes {
  public id!: number;
  public title!: string;
  public body!: string;
  public authorId!: number;
  public date!: Date;

  static initModel(sequelize: Sequelize) {
    Notice.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        body: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        authorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            isDate: true,
          },
        },
      },
      {
        sequelize,
        tableName: 'notices',
        timestamps: false,
        underscored: true, // Compatibilidade com PostgreSQL
      }
    );
  }
}

Notice.initModel(sequelize);
Notice.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

export { Notice, NoticeCreationAttributes };

