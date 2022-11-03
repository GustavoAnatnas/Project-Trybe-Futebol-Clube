// import { Request, Response, NextFunction } from 'express';
// import * as bcrypt from 'bcryptjs';
// import LoginServices from '../Services/LoginServices';

// const LoginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'All fields must be filled' });
//   }
//   const user = await LoginServices.login(email, password);
//   if (!user) {
//     return res.status(400).json({ message: 'Incorrect email or password' });
//   }
//   const checkPassword = await bcrypt.compare(password, user.includes('password'));
//   if (!checkPassword) {
//     return res.status(400).json({ message: 'All fields must be filled' });
//     next();
//   }
// };

// export default LoginMiddleware;
