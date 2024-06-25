const message = {
  // default error status messages
  BAD_REQUEST: '잘못된 요청',
  BAD_PATH: '잘못된 경로',
  UNAUTHORIZED: '승인되지 않은 유저',
  FORBIDDEN: '권한이 없는 유저의 요청',
  NOT_FOUND: '존재하지 않는 자원',
  DUPLICATED: '이미 존재하는 데이터',
  TEMPORARY_UNAVAILABLE: '일시적으로 사용할 수 없는 서버',
  INTERNAL_SERVER_ERROR: '서버 내부 오류',
  DB_ERROR: '데이터베이스 오류',

  // etc error
  NULL_VALUE: '필요한 값이 없습니다',

  //auth
  NULL_VALUE_TOKEN: '토큰이 없습니다',
  EXPIRED_TOKEN: '만료된 토큰',
  INVALID_TOKEN: '존재하지 않는 토큰',
  INVALID_PASSWORD: '잘못된 비밀번호',
  INVALID_ID: '유효하지 않은 ID',
  NOT_FOUND_USER_EMAIL: '가입되지 않은 이메일',
  CONFLICT_EMAIL: '이메일 중복',
  SIGNUP_SUCCESS: '회원가입 성공',
  LOGIN_SUCCESS: '로그인 성공',
  
}

export default message;