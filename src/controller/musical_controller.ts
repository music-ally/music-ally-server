import mongoose from "mongoose";
import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { NextFunction, Request, Response } from "express";
import * as musical_service from "../service/musical/musical_service";

const find_most_review_musical = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  try {
    const data = await musical_service.most_review_musical();

    return res
      .status(status_code.OK)
      .send(form.success(message.MOST_REVIEW_MUSICAL_SUCCESS, data));

  } catch (error) {
    console.error("Error at most_review_musical: Controller", error);

    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
};


const find_top_rank_musical = async ( 
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

const find_most_bookmark_musical = async ( 
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

const find_musical_by_actor = async ( 
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

const find_musical_by_following = async ( 
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

const find_musical_by_sex_bookmark = async ( 
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

const find_musical_by_sex_review = async ( 
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

const find_musical_by_age_bookmark = async ( 
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

const find_musical_by_age_review = async ( 
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

const find_near_musical = async ( 
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

const find_ongoing_musical = async ( 
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

const musical_detail = async ( 
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

const bookmark = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  
  const { musicalId } = req.params
  
  try {
    await musical_service.bookmark(req.user_id, musicalId);

    return res
      .status(status_code.CREATED)
      .send(form.success(message.BOOKMARK_SUCCESS));
  } catch (error) {
    console.error("Error at bookmark: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
  
};

const cancel_bookmark = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  const { musicalId } = req.params
  
  try {
    await musical_service.cancel_bookmark(req.user_id, musicalId);

    return res
      .status(status_code.NO_CONTENT)
      .send(form.success(message.CANCEL_BOOKMARK_SUCCESS));
  } catch (error) {
    console.error("Error at cancel_bookmark: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
  
};

export { 
  find_top_rank_musical,
  find_most_review_musical,
  find_most_bookmark_musical,
  find_musical_by_actor,
  find_musical_by_following,
  find_near_musical,
  find_musical_by_age_bookmark,
  find_musical_by_age_review,
  find_musical_by_sex_bookmark,
  find_musical_by_sex_review,
  find_ongoing_musical,
  musical_detail,
  bookmark,
  cancel_bookmark  
}