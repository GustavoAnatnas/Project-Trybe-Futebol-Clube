import { Request, Response } from 'express';
import LoginService from '../Services/LoginServices';

export default class LoginController {
  constructor(readonly service = new LoginService()) {}

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const response = await LoginService.login(email, password);
    return res.status(response.status).json(response);
  };

  getRole = async (req: Request, res: Response) => {
    const { role } = req.headers;
    const response = await LoginService.validateToken(role as string);
    return res.status(200).json(response);
  };
}
