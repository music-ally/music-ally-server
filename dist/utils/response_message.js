"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    // common
    FETCH_SUCCESS: '반환 성공',
    CREATE_SUCCESS: '생성 성공',
    UPDATE_SUCCESS: '수정 성공',
    DELETE_SUCCESS: '삭제 성공',
    //auth
    NULL_VALUE_TOKEN: '헤더에 토큰이 없습니다',
    EXPIRED_TOKEN: '만료된 토큰',
    INVALID_TOKEN: '유효하지 않은 토큰',
    INVALID_PASSWORD: '잘못된 비밀번호',
    NOT_FOUND_EMAIL: '가입되지 않은 이메일',
    LEFT_USER: '회원 탈퇴한 유저',
    CONFLICT_EMAIL: '이메일 중복',
    SIGNUP_SUCCESS: '회원가입 성공',
    LOGIN_SUCCESS: '로그인 성공',
    LOGOUT_SUCCESS: '로그아웃 성공',
    LEAVE_SUCCESS: '회원탈퇴 성공',
    CHECK_EMAIL_SUCCESS: '이메일 중복 확인 성공',
    CHECK_NICKNAME_SUCCESS: '닉네임 중복 확인 성공',
    //actor
    //musical
    ALL_MUSICAL_SUCCESS: '검색용 모든 뮤지컬 반환 성공',
    TOP_RANK_MUSICAL_SUCCESS: '랭킹 상위 10위 뮤지컬 반환 성공',
    MOST_REVIEW_MUSICAL_SUCCESS: '리뷰 개수 상위 10개 뮤지컬 반환 성공',
    MOST_BOOKMARK_MUSICAL_SUCCESS: '찜 수 상위 10개 뮤지컬 반환 성공',
    ACTOR_MUSICAL_SUCCESS: '특정 배우의 뮤지컬 반환 성공',
    FOLLOWING_MUSICAL_SUCCESS: '나의 팔로잉의 뮤지컬 반환 성공',
    NEAR_MUSICAL_SUCCESS: '나의 거주지 근처 뮤지컬 반환 성공',
    MY_AGE_BOOKMARK_MUSICAL_SUCCESS: '나의 연령대 찜 수 상위 10개 뮤지컬 반환 성공',
    MY_AGE_REVIEW_MUSICAL_SUCCESS: '나의 연령대 리뷰 개수 상위 10개 뮤지컬 반환 성공',
    ONGOING_MUSICAL_SUCCESS: '현재 개막중인 뮤지컬 반환 성공',
    MY_SEX_BOOKMARK_MUSICAL_SUCCESS: '동성의 찜 수 상위 10개 뮤지컬 반환 성공',
    MY_SEX_REVIEW_MUSICAL_SUCCESS: '동성의 리뷰 개수 상위 10개 뮤지컬 반환 성공',
    MUSICAL_DETAIL_SUCCESS: '뮤지컬 상세 정보 반환 성공',
    BOOKMARK_SUCCESS: '뮤지컬 찜 성공',
    CANCEL_BOOKMARK_SUCCESS: '뮤지컬 찜 취소 성공',
    //review
    GET_REVIEW_MAIN_SUCCESS: '리뷰 메인 페이지 데이터 반환 성공',
    REVIEW_DETAIL_SUCCESS: '리뷰 상세 반환 성공',
    REVIEW_WRITE_SUCCESS: '리뷰 작성 성공',
    UPDATE_REVIEW_SUCCESS: '리뷰 수정 성공',
    REVIEW_LIKE_SUCCESS: '리뷰 좋아요 성공',
    CANCEL_REVIEW_LIKE_SUCCESS: '리뷰 좋아요 취소 성공',
    GET_WRITER_PROFILE_SUCCESS: '리뷰 작성자 데이터 반환 성공'
};
exports.default = message;
//# sourceMappingURL=response_message.js.map