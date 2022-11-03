import * as jwt from 'jsonwebtoken';

const secret = 'segredo';

const jwtToken = (email: string): string => {
  const token = jwt.sign(email, secret, { expiresIn: '1h' });
  return token;
};

export default jwtToken;
