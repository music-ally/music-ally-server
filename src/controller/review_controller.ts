import mongoose from "mongoose";
import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { NextFunction, Request, Response } from "express";
import * as review_service from "../service/review/review_service";
import { review_write_dto } from "../dto/review/request/review_write";


const write_review = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  const review_write_dto: review_write_dto = req.body

  try {
    const data = await review_service.write_review(req.user_id, review_write_dto);

    return res
      .status(status_code.OK)
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

const review_detail = async ( 
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

const modify_review = async ( 
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

const review_like = async ( 
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

const cancel_review_like = async ( 
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

export { 
  best_review,
  all_review,
  review_detail,
  write_review,
  modify_review,
  review_like,
  cancel_review_like
}