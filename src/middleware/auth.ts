import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from "../utils/jwt_handler";
import { error } from "console";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res
      .status(status_code.UNAUTHORIZED)
      .send(
        form.fail(message.NULL_VALUE_TOKEN)
      );
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = verifyToken(token);
    req.token = user;
    next();
  } catch (err) {
    return res
      .status(status_code.UNAUTHORIZED)
      .send(
        form.fail(message.INVALID_TOKEN)
      );
  }
};

export default auth;
