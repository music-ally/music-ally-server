import mongoose from "mongoose";
import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import * as notification_service from "../service/notification/notification_service";

/**
 * 알림 반환
 */
const fetch_notifications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await notification_service.get_notification(req.user_id);

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error(
      "error fetching all notifications: controller/notifications",
      error
    );
    throw error;
  }
};

/**
 * 알림 껐다 켰다
 */
const change_notification = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await notification_service.on_off_notification(req.user_id);

    return res
      .status(status_code.OK)
      .send(form.success(message.UPDATE_SUCCESS, data));
  } catch (error) {
    console.error(
      "error turning notification: controller/notifications",
      error
    );
    throw error;
  }
};

export {
    fetch_notifications,
    change_notification
}