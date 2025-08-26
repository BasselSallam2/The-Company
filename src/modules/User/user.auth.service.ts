import { UserModel } from "./user.schema.js";
import { Request, Response, NextFunction } from "express";
import { LoginStatus } from "@utils/interfaces.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "@/utils/apiError.js";

const tokenTTL = "1d";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { phoneNumber, password } = req.body;
  const user = (await UserModel.findOne({
    phoneNumber: phoneNumber,
  })) as any;
  if (!user) {
    return res
      .status(401)
      .json({ status: LoginStatus.INVALID_CREDENTIALS, id: null });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ApiError(401, "errors.login.INVALID_CREDENTIALS", req.t));
  }
  if (user.active === false) {
    return next(new ApiError(401, "errors.login.USER_NOT_ACTIVE", req.t));
  }
  if (user.deleted === true) {
    return next(new ApiError(401, "errors.login.USER_DELETED", req.t));
  }
  const token = jwt.sign(
    { _id: user._id, permessions: user.permessions },
    process.env.JWT_SECRET as string,
    {
      expiresIn: tokenTTL,
    }
  );

  return res
    .status(200)
    .json({ status: LoginStatus.LOGIN_SUCCESSFULLY, token });
};

export { login };
