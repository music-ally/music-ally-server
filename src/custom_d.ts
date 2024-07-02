//외부 라이브러리 타입 확장 혹은 새로운 타입 정의 용도

declare namespace Express {
    export interface Request {
      token?: any;
      user_id?: any;
    }
}
  