import { Model, DataTypes } from 'sequelize';
import db from '.';

class teams extends Model {
  public id: number;
  public teamName: string;
}

teams.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default teams;
