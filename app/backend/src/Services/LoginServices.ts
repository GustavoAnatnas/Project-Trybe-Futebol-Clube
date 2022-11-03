import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';

export default class LoginServices {
  static login = async (email: string, password: string) => {
    if (!email || !password) return { status: 400, message: 'All fields must be filled' };

    const user = await UserModel.findOne({ where: { email } });
    if (!user) return { status: 401, message: 'Incorrect email or password' };

    const userOk = bcrypt.compareSync(password, user.password);
    if (!userOk) return { status: 401, message: 'Incorrect email or password' };

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    return { status: 200, message: 'Login successful', token };
  };
}
