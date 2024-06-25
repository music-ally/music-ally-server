import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import * as user_service from "../service/user/user_service";
import { user_info } from "../dto/user/user_info";
import { user_join_dto } from "../dto/user/request/user_join";
import { user_login_dto } from "../dto/user/request/user_login";
import { user_login_res_dto } from "../dto/user/response/user_login_res"; //Todo 한 번에 import 하는 방법 있는지 확인

const createUser = async ( //Todo 다시 검토하고 수정하기
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  const user_join_dto: user_join_dto = req.body

  try {
    const data = await user_service.create_user(user_join_dto);
    console.log(data);
    return res.send("create_user success!");
  } catch (error) {
    console.error("Error at creating User: Controller", error);
    res.status(500).json({ error: "Error creating User: Controller" });
  }
};

const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  /*const user_info: user_info = req.body

  try {
    const data = await user_service.create_user(user_info);
    console.log(data);

    return res.send("create_user success!");
  } catch (error) {
    console.error("Error at creating User: Controller", error);
    res.status(500).json({ error: "Error creating User: Controller" });
  }*/
};

const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  /*const user_info: user_info = req.body

  try {
    const data = await user_service.create_user(user_info);
    console.log(data);

    return res.send("create_user success!");
  } catch (error) {
    console.error("Error at creating User: Controller", error);
    res.status(500).json({ error: "Error creating User: Controller" });
  }*/
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  const user_login_dto: user_login_dto = req.body

  try {
    const tokens: user_login_res_dto = await user_service.login_user(user_login_dto);
    return res.status(200).json(tokens);
  } catch (error) {
    console.error("Error at login: Controller", error);
    res.status(500).json({ error: "Error logging in: Controller" });
  }
};

export {createUser, deleteUser, login, logout}