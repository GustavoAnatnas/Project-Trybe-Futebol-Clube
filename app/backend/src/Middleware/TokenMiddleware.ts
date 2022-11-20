import { Request, Response } from 'express';
import JWT from '../Helpers/JTWtoken';

const tokenAuth = (req: Request, res: Response) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  const verify = JWT.validateToken(authorization);
  return res.status(200).json(verify);
};

export default tokenAuth;
