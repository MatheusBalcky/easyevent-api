import jwt from 'jsonwebtoken';
import { unauthorized } from './throwErrors';

export function createToken(payload: jwt.JwtPayload) {
  const token = jwt.sign(payload, String(process.env.JWT_SECRET), { expiresIn: '24h' });

  return token;
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, String(process.env.JWT_SECRET));
  } catch (error) {
    return false;
  }
}

export function validateToken(token: string) {
  const result = verifyToken(token);

  if (!result) throw unauthorized('Token inválido!');

  return result;
}
