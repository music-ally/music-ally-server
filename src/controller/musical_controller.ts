import mongoose from "mongoose";
import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { NextFunction, Request, Response } from "express";
import * as musical_service from "../service/musical/musical_service";

const all_musical = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await musical_service.all_musical();

    return res
      .status(status_code.OK)
      .send(form.success(message.ALL_MUSICAL_SUCCESS, data));
  } catch (error) {
    console.error("Error at get all musical: Controller", error);
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


const find_most_bookmark_musical = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  try {
    const data = await musical_service.most_bookmark_musical();

    return res
      .status(status_code.OK)
      .send(form.success(message.MOST_BOOKMARK_MUSICAL_SUCCESS, data));

  } catch (error) {
    console.error("Error at most_bookmark_musical: Controller", error);

    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
};

const find_musical_by_actor = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  
  const data = await musical_service.random_actor_musical();

  try {
    return res
      .status(status_code.OK)
      .send(form.success(message.ACTOR_MUSICAL_SUCCESS, data));
  } catch (error) {
    console.error("Error at find random actor's musical: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
  
};

const find_musical_by_following = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  
  const data = await musical_service.random_follow_musical(req.user_id);

  try {
    return res
      .status(status_code.OK)
      .send(form.success(message.FOLLOWING_MUSICAL_SUCCESS, data));
  } catch (error) {
    console.error("Error at get following's reviewed musical: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
  
};

const find_musical_my_sex_bookmark = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  
  const data = await musical_service.musical_my_sex_bookmark(req.user_id);

  try {
    return res
      .status(status_code.OK)
      .send(form.success(message.MY_SEX_BOOKMARK_MUSICAL_SUCCESS, data));
  } catch (error) {
    console.error("Error at get my sex most bookmarked musical: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
  
};

const find_musical_my_sex_review = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  const data = await musical_service.musical_my_sex_review(req.user_id);

  try {
    return res
      .status(status_code.OK)
      .send(form.success(message.MY_SEX_REVIEW_MUSICAL_SUCCESS, data));
  } catch (error) {
    console.error("Error at get my sex most reviewed musical: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
};

const find_musical_my_age_bookmark = async ( 
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

const find_musical_my_age_review = async ( 
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const data = await musical_service.musical_my_age_review(req.user_id);
  
  try {
    return res
      .status(status_code.OK)
      .send(form.success(message.MY_AGE_REVIEW_MUSICAL_SUCCESS, data));
  } catch (error) {
    console.error("Error at my age_group most review musical: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
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
  const {musicalId} = req.params
  const data = await musical_service.musical_detail(req.user_id, musicalId)

  try {
    return res
      .status(status_code.OK)
      .send(form.success(message.MUSICAL_DETAIL_SUCCESS, data));
  } catch (error) {
    console.error("Error at musical_detail: Controller", error);
    return res
      .status(status_code.INTERNAL_SERVER_ERROR)
      .send(form.fail(message.INTERNAL_SERVER_ERROR, error));
  }
  
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
  all_musical,
  find_top_rank_musical,
  find_most_review_musical,
  find_most_bookmark_musical,
  find_musical_by_actor,
  find_musical_by_following,
  find_near_musical,
  find_musical_my_age_bookmark,
  find_musical_my_age_review,
  find_musical_my_sex_bookmark,
  find_musical_my_sex_review,
  find_ongoing_musical,
  musical_detail,
  bookmark,
  cancel_bookmark  
}