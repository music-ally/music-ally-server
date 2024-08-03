import mongoose from "mongoose";
import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import * as mypage_service from "../service/mypage/mypage_service";
import * as mypage_service_utils from "../service/mypage/mypage_service_utils";
import { user_update_dto } from "../dto/user/request/user_update"

/**
 * 내 프로필 반환
 */
const fetch_my_profile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const data = await mypage_service.get_my_profile(req.user_id);
  
      return res
        .status(status_code.OK)
        .send(form.success(message.FETCH_SUCCESS, data));
    } catch (error) {
      console.error(
        "error fetching my profile: controller/mypage",
        error
      );
      throw error;
    }
  };

/**
 * 내가 작성한 리뷰 상세 모달
 */
const fetch_mypage_review_detail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const review_id: string = req.params.reviewId;
    
    try {
      const data = await mypage_service.mypage_review_detail(review_id);
  
      return res
        .status(status_code.OK)
        .send(form.success(message.FETCH_SUCCESS, data));
    } catch (error) {
      console.error(
        "error fetching mypage's review detail: controller/mypage",
        error
      );
      throw error;
    }
  };

/**
 * 리뷰 삭제
 */
const delete_review = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    const review_id: string = req.params.reviewId;

    try {
      const data = await mypage_service.delete_review(req.user_id, review_id);
  
      return res
        .status(status_code.OK)
        .send(form.success(message.DELETE_SUCCESS, data));
    } catch (error) {
      console.error(
        "error deleting mypage's review: controller/mypage",
        error
      );
      throw error;
    }
  };

/**
 * 개인정보 수정
 */
const update_profile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
  
    const user_update_dto: user_update_dto = JSON.parse(req.body.update_data);

    if (req.file) {
      user_update_dto.profile_image = req.file.path;
    }

    try {
      const data = await mypage_service.update_profile(req.user_id, user_update_dto);
  
      return res
        .status(status_code.OK)
        .send(form.success(message.UPDATE_SUCCESS, data));
    } catch (error) {
      console.error(
        "error updating profile: controller/mypage",
        error
      );
      throw error;
    }
};


/**
 * 개인정보 수정(파일)
 */
const update_profile_image = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  let profile_image;

  if (req.file) {
    profile_image = req.file.path;
  }

  try {
    const data = await mypage_service.update_profile_image(req.user_id, profile_image);

    return res
      .status(status_code.OK)
      .send(form.success(message.UPDATE_SUCCESS, data));
  } catch (error) {
    console.error(
      "error updating profile: controller/mypage",
      error
    );
    throw error;
  }
};


/**
 * 개인정보 수정 (json)
 */
const update_profile_text = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  const user_update_dto: user_update_dto = req.body;

  try {
    const data = await mypage_service.update_profile(req.user_id, user_update_dto);

    return res
      .status(status_code.OK)
      .send(form.success(message.UPDATE_SUCCESS, data));
  } catch (error) {
    console.error(
      "error updating profile: controller/mypage",
      error
    );
    throw error;
  }
};

/**
 * 팔로워 목록 보기
 */
const fetch_follower = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const data = await mypage_service_utils.get_follower(req.user_id);
  
      return res
        .status(status_code.OK)
        .send(form.success(message.FETCH_SUCCESS, data));
    } catch (error) {
      console.error(
        "error fetching follower: controller/mypage",
        error
      );
      throw error;
    }
  };

/**
 * 팔로잉 목록 보기
 */
const fetch_following = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const data = await mypage_service_utils.get_following(req.user_id);
  
      return res
        .status(status_code.OK)
        .send(form.success(message.FETCH_SUCCESS, data));
    } catch (error) {
      console.error(
        "error fetching following: controller/mypage",
        error
      );
      throw error;
    }
  };

export {
  fetch_my_profile,
  fetch_mypage_review_detail,
  delete_review,
  update_profile,
  fetch_follower,
  fetch_following,
  update_profile_image,
  update_profile_text
}