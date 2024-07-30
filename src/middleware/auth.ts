import form from "../utils/response_form";
import message from "../utils/response_message";
import status_code from "../utils/status_code";
import { Request, Response, NextFunction } from 'express';
import { verify_token } from "../utils/jwt_handler";
import Blacklists from "../schema/jwt_blacklist";

const auth = async (req: Request, res: Response, next: NextFunction) => {
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
    const verified_token = verify_token(token);

    const check_blacklist = await Blacklists.findOne({ token });
    if (check_blacklist) {
      return res
      .status(status_code.UNAUTHORIZED)
      .send(
        form.fail(message.INVALID_TOKEN)
      );
    }

    req.token = token;
    req.user_id = verified_token.id;

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
