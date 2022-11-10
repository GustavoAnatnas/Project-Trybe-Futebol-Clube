import * as jwt from 'jsonwebtoken';

// const secret = 'segredo';

export default class JWT {
  public generateToken = (id: number) => {
    const token = jwt.sign(
      { id },
      process.env.JWT_SECRET as string,

      { expiresIn: '1h' },
    );
    return token;
  };

  static validateToken = (token: string) => {
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET as string);
      return verify;
    } catch (err) {
      return { status: 401, message: 'Token must be a valid token' };
    }
  };
}
