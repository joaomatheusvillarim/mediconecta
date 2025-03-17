import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';
import { Record } from './Record';
import { Clinic } from './Clinic';

interface PatientAttributes {
  userId: number;
  clinicId: number
}

export class Patient extends Model<PatientAttributes> implements PatientAttributes {
  public readonly userId!: number;
  public readonly clinicId!: number;
}

Patient.init(
  {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      unique: true,
    },
    clinicId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Clinic,
        key: "id",
      }
    }
  },
  {
    sequelize,
    tableName: "patients",
    timestamps: true,
    paranoid: true,
    hooks: {
      afterCreate: async (patient, _) => {
        await Record.create({
          userId: patient.userId,
          clinicId: patient.clinicId,
        })
      }
    }
  }
);

Patient.belongsTo(
  User, {
    foreignKey: "userId",
  }
);
Patient.belongsTo(
  Clinic, {
    foreignKey: "clinicId",
  }
);