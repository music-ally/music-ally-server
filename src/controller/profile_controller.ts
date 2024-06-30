import mongoose from "mongoose";
import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import * as profile_service from "../service/profile/profile_service";
import * as mypage_service from "../service/mypage/mypage_service";
import * as mypage_service_utils from "../service/mypage/mypage_service_utils";

/**
 * 팔로우 하기
 */
const create_follow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  // const user_id: string = req.body.user.id;
  const user_id: string = req.params.userId;
  const to_user_id: string = req.params.toUserId;

  try {
    const data = await profile_service.do_follow(user_id, to_user_id);

    return res
      .status(status_code.OK)
      .send(form.success(message.CREATE_SUCCESS, data));
  } catch (error) {
    console.error("error following: controller/profile", error);
    throw error;
  }
};

/**
 * 팔로우 취소 하기
 */
const delete_follow = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  // const user_id: string = req.body.user.id;
  const user_id: string = req.params.userId;
  const to_user_id: string = req.params.toUserId;
  try {
    const data = await profile_service.cancle_follow(user_id, to_user_id);

    return res
      .status(status_code.OK)
      .send(form.success(message.DELETE_SUCCESS, data));
  } catch (error) {
    console.error("error cancle following: controller/profile", error);
    throw error;
  }
};

/**
 * 유저 프로필 반환
 */
const fetch_user_profile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const user_id: string = req.params.userId;

  try {
    const data = await mypage_service.get_my_profile(user_id);

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error("error fetching user's profile: controller/profile", error);
    throw error;
  }
};

/**
 * 팔로워 목록 보기
 */
const fetch_user_follower = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const user_id: string = req.params.userId;

  try {
    const data = await mypage_service_utils.get_follower(user_id);

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error("error fetching user's follower: controller/profile", error);
    throw error;
  }
};

/**
 * 팔로잉 목록 보기
 */
const fetch_user_following = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const user_id: string = req.params.userId;

  try {
    const data = await mypage_service_utils.get_following(user_id);

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error("error fetching user's following: controller/profile", error);
    throw error;
  }
};

export {
  create_follow,
  delete_follow,
  fetch_user_profile,
  fetch_user_follower,
  fetch_user_following,
};
