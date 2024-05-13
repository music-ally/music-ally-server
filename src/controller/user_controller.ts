import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import * as user_service from "../service/user/user_service";

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const data = await user_service.create_user;
    console.log(data);

    return res.send("create_user success!");
  } catch (error) {
    console.error("Error at creating User: Controller", error);
    res.status(500).json({ error: "Error creating User: Controller" });
  }
};

export { createUser };
