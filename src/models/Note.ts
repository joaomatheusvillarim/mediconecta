import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
import sequelize from '../config/database';
import { Patient } from './Patient';
import { Doctor } from './Doctor';

interface NoteAttributes {
  id: number;
  title: string;
  body: string;
  date: Date;
  patientId: number;
  doctorId: number;
}

interface NoteCreationAttributes extends Optional<NoteAttributes, 'id'> {}

class Note extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
  public id!: number;
  public title!: string;
  public body!: string;
  public date!: Date;
  public patientId!: number;
  public doctorId!: number;

  static initModel(sequelize: Sequelize) {
    Note.init(
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
        date: {
          type: DataTypes.DATE,
          allowNull: false,
          validate: {
            isDate: true,
          },
        },
        patientId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        doctorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'notes',
        timestamps: false,
        underscored: true, // Compatibilidade com PostgreSQL
      }
    );
  }
}

Note.initModel(sequelize);
Note.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Note.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

export { Note, NoteCreationAttributes };