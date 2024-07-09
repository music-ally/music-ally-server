import mongoose from "mongoose";
import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { NextFunction, Request, Response } from "express";
import * as review_service from "../service/review/review_service";
import { review_write_dto } from "../dto/review/request/review_write";
import { review_update_dto } from "../dto/review/request/review_update";


const write_review = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  const review_write_dto: review_write_dto = req.body

  try {
    const data = await review_service.write_review(req.user_id, review_write_dto);

    return res
      .status(status_code.CREATED)
      .send(form.success(message.REVIEW_WRITE_SUCCESS, data));

  } catch (error) {
    console.error("Error at write_review: Controller", error);
    
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
};


const best_review = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  /*
  try {
    return res
      .status(status_code.OK)
      .send(form.success(message.MOST_REVIEW_MUSICAL_SUCCESS, data));
  } catch (error) {
    console.error("Error at most_review_musical: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
  */
};

const all_review = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const data = await review_service.all_review();

  try {
    return res
      .status(status_code.OK)
      .send(form.success(message.REVIEW_DETAIL_SUCCESS, data));
  } catch (error) {
    console.error("Error at review_detail: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
};

const review_detail = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { reviewId } = req.params
  const data = await review_service.review_detail(reviewId, req.user_id);

  try {
    return res
      .status(status_code.OK)
      .send(form.success(message.REVIEW_DETAIL_SUCCESS, data));
  } catch (error) {
    console.error("Error at review_detail: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
};

const update_review = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  const review_update_dto: review_update_dto = req.body
  const { reviewId } = req.params

  try {
    const data = await review_service.update_review(reviewId, review_update_dto);

    return res
      .status(status_code.OK)
      .send(form.success(message.UPDATE_REVIEW_SUCCESS, data));

  } catch (error) {
    console.error("Error at update_review: Controller", error);
    
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
};

const review_like = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { reviewId } = req.params
  
  try {
    await review_service.review_like(req.user_id, reviewId);

    return res
      .status(status_code.CREATED)
      .send(form.success(message.REVIEW_LIKE_SUCCESS));
  } catch (error) {
    console.error("Error at review_like: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
};

const cancel_review_like = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { reviewId } = req.params
  
  try {
    await review_service.cancel_review_like(req.user_id, reviewId);

    return res
      .status(status_code.NO_CONTENT)
      .send(form.success(message.CANCEL_REVIEW_LIKE_SUCCESS));
  } catch (error) {
    console.error("Error at cancel_review_like: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
};

export { 
  best_review,
  all_review,
  review_detail,
  write_review,
  update_review,
  review_like,
  cancel_review_like
}