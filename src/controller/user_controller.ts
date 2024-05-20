import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import * as user_service from "../service/user/user_service";
import { user_info } from "../dto/user/user_info";

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
