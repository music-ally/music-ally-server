import mongoose from "mongoose";
import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import * as actor_service from "../service/actor/actor_service";
import * as actor_service_util from "../service/actor/actor_service_util";
import { create_actor_dto } from "../dto/actor/response/create_actor";
/**
 * 특정 뮤지컬 출연 배우 반환
 */
const fetch_actors_appeared = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await actor_service.get_many_actors_in_random_musical();

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error(
      "error fetching actors appeard in musical: controller/actor",
      error
    );
    throw error;
  }
};

/**
 * 가수 겸 뮤지컬 배우 반환
 */
const fetch_singers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await actor_service.get_singers();

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error("error fetching singers: controller/actor", error);
    throw error;
  }
};

/**
 * 조회수가 가장 높은 배우 반환
 */

/**
 * 특정 배우 정보 반환
 */
const fetch_actor_details = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const actor_id = req.params.actorId;

  try {
    const data = await actor_service_util.get_actor_details(actor_id);

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error("error fetching actor's details: controller/actor", error);
    throw error;
  }
};

/**
 * 더미 데이터 넣기 용
 */
const create_actor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const create_actor_dto: create_actor_dto = req.body;

  try {
    const data = await actor_service.create_actor(create_actor_dto);

    return res
      .status(status_code.OK)
      .send(form.success(message.CREATE_SUCCESS, data));
  } catch (error) {
    console.error("error creating actor: controller/actor", error);
    throw error;
  }
};

export {
  fetch_actors_appeared,
  fetch_singers,
  fetch_actor_details,
  create_actor,
};
