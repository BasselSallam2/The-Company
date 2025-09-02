import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "@utils/apiError.js";
import mongoose from "mongoose";
import { GenericServices } from "@services/genericServices.js";
import { UserModel } from "@/modules/User/user.schema.js";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new ApiError(401, "errors.login.UNAUTHORIZED", req.t, {}, "clearToken")
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const { _id } = decoded as { _id: string; permissions: string[] };
    const user = (await UserModel.findById(_id).select(
      "active deleted"
    )) as any;
    if (!user)
      return next(new ApiError(401, "errors.login.USER_NOT_FOUND", req.t));
    if (user.active === false) {
      return next(new ApiError(401, "errors.login.USER_NOT_ACTIVE", req.t));
    }
    if (user.deleted === true) {
      return next(new ApiError(401, "errors.login.USER_DELETED", req.t));
    }
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === "JsonWebTokenError") {
      return next(new ApiError(401, "errors.login.INVALID_SIGNTURE", req.t));
    }
    if (err.name === "TokenExpiredError") {
      return next(new ApiError(401, "errors.login.TOKEN_EXPIRED", req.t));
    }
    return next(err);
  }
};

const allowedWith =
  (...Allowedpermissions: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { permissions } = req.user as { permissions: string[] };
    if (!Allowedpermissions.every((p) => permissions.includes(p))) {
      return next(new ApiError(403, "errors.forbidden", req.t));
    }
    next();
  };

export { protect, allowedWith };
