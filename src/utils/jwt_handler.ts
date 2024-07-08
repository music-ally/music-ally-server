import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const generate_access_token = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '1h', // 토큰의 유효시간 = 1시간 
  });
};

const generate_refresh_token = (id: string): string => {
  return jwt.sign({ id }, JWT_REFRESH_SECRET, {
    expiresIn: '1d', // 토큰의 유효시간 = 하루
  });
};

const verify_token = (token: string, isRefreshToken: boolean = false): any => {
  const secret = isRefreshToken ? JWT_REFRESH_SECRET : JWT_SECRET;
  return jwt.verify(token, secret);
};

export {generate_access_token, generate_refresh_token, verify_token};
