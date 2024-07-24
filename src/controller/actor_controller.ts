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
 * 모든 배우 반환
 */
const fetch_all_actors = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await actor_service.get_all_actors();

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error(
      "error fetching all actors: controller/actor",
      error
    );
    throw error;
  }
};

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
      "error fetching actors appeared in musical: controller/actor",
      error
    );
    throw error;
  }
};

/**
 * 특정 뮤지컬(n개) 출연 배우 반환
 */
const fetch_num_actors_appeared = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const n = parseInt(req.params.num);
  try {
    const data = await actor_service.get_many_actors_in_num_random_musical(n);

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error(
      "error fetching actors appeared in num musical: controller/actor",
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
const fetch_most_viewed = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await actor_service.get_most_viewed();

    return res
      .status(status_code.OK)
      .send(form.success(message.FETCH_SUCCESS, data));
  } catch (error) {
    console.error("error fetching most viewed actor: controller/actor", error);
    throw error;
  }
};

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

/**
 * 랜덤 뮤컬아이디 잘 반환하는지 확인하는용
 */
const check_random_musicalId = async() => {
  try {
    const data = await actor_service_util.get_random_musical();

    return data;
  } catch (error) {
    console.error("error fetching random musical: controller/actor", error);
    throw error;
  }

}

export {
  fetch_all_actors,
  fetch_actors_appeared,
  fetch_num_actors_appeared,
  fetch_singers,
  fetch_most_viewed,
  fetch_actor_details,
  create_actor,

  check_random_musicalId
};
