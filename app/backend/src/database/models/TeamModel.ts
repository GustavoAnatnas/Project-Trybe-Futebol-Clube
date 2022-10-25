import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id: number;
  public teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: new DataTypes.STRING(),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  tableName: 'teams',
  timestamps: false,
});

export default Teams;
