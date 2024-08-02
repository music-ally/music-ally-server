import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { NextFunction, Request, Response } from "express";
import * as search_service from "../service/search/search_service";


const search_actors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const keyword = req.query.keyword as string;
    const data = await search_service.search_actor(keyword);

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error(
      "error searching actors: controller/search",
      error
    );
    throw error;
  }
};

const search_musicals = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    console.log('Query Parameters:', req.query);
    const keyword = req.query.keyword as string;
    console.log(keyword);
    const data = await search_service.search_musical(keyword);

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error(
      "error searching musicals: controller/search",
      error
    );
    throw error;
  }
};

export {
  search_actors,
  search_musicals
};
