import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

const generateAccessToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: '15m', // 토큰의 유효시간 = 15분 h로 하면 시간단위도 가능 
  });
};

const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, JWT_REFRESH_SECRET, {
    expiresIn: '1d', // 토큰의 유효시간 = 하루
  });
};

const verifyToken = (token: string, isRefreshToken: boolean = false): any => {
  const secret = isRefreshToken ? JWT_REFRESH_SECRET : JWT_SECRET;
  return jwt.verify(token, secret);
};

export {generateAccessToken, generateRefreshToken, verifyToken};
