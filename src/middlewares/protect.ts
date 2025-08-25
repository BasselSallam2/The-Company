import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "@utils/apiError.js";
import mongoose from "mongoose";
import {GenericServices} from "@services/genericServices.js";




 const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError(401, "errors.login.UNAUTHORIZED", req.t));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ApiError(401, "errors.login.UNAUTHORIZED", req.t));
  }
};

 const allowedWith =  (...Allowedpermissions: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  const {_id , modelName} = req.user as {_id: string , modelName: string};
  const model = new GenericServices(mongoose.model(modelName));
  const result = await model.getOne(_id, { selectOption: ["permessions"] });
  console.log(result);
  console.log(Allowedpermissions);
 if (result && !Array.isArray(result)) {
  const user = result as unknown as { permessions: string[] };
  if (!user.permessions.some((p) => Allowedpermissions.includes(p))) {
    return next(new ApiError(403, "errors.forbidden", req.t));
  }
}
  
  next();
};

export {protect, allowedWith};
