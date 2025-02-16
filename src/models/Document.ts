import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { Patient } from './Patient';

interface DocumentAttributes {
  id: number;
  filePath: string;
  patientId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DocumentCreationAttributes extends Optional<DocumentAttributes, 'id'> {}

class Document extends Model<DocumentAttributes, DocumentCreationAttributes> implements DocumentAttributes {
  public id!: number;
  public filePath!: string;
  public patientId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Document.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        filePath: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        patientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'documents',
        timestamps: true,
        underscored: true, // Compatibilidade com PostgreSQL
      }
    );
  }
}

Document.initModel(sequelize);
Document.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

export { Document, DocumentCreationAttributes};
