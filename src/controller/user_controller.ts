import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import * as user_service from "../service/user/user_service";
<<<<<<< Updated upstream
import { user_info } from "../dto/user/user_info";
=======
import user_join_dto from "../dto/user/request/user_join";
import user_login_dto from "../dto/user/request/user_login";
import user_login_response_dto from "../dto/user/response/user_login_res"; //Todo 한 번에 import 하는 방법 있는지 확인
>>>>>>> Stashed changes

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {

  const user_info: user_info = req.body

  try {
    const data = await user_service.create_user(user_info);
    console.log(data);
    return res.send("create_user success!");
  } catch (error) {
    console.error("Error at creating User: Controller", error);
    res.status(500).json({ error: "Error creating User: Controller" });
  }
};

export { createUser };
