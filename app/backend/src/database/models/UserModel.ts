import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class User extends Model {
  public id: number;
  public username: string;
  public role: string;
  public email: string;
  public password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(),
    allowNull: false,
  },
  role: {
    type: new DataTypes.STRING(),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  tableName: 'users',
  timestamps: false,
});

export default User;
