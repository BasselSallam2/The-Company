import {UserModel} from "./user.model.js";
import { Request, Response, NextFunction } from "express";
import { LoginStatus } from "@utils/interfaces.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const tokenTTL = "1d";

 const login = async (req: Request, res: Response, next: NextFunction) => {
  const { phoneNumber, password } = req.body;
  const user = (await UserModel
    .findOne({ phoneNumber: phoneNumber })
    .cache()) as any;
  if (!user) {
    return res.status(401).json({ status: LoginStatus.INVALID_CREDENTIALS, id: null });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ status: LoginStatus.INVALID_CREDENTIALS, id: null });
  }
  if (user.active === false) {
    return res.status(401).json({ status: LoginStatus.INACTIVE, id: null });
  }
  if (user.deleted === true) {
    return res.status(401).json({ status: LoginStatus.DELETED, id: null });
  }
  const token = jwt.sign({ _id: user._id , modelName: "User"}, process.env.JWT_SECRET as string, {
    expiresIn: tokenTTL,
  });
  

  return res.status(200).json({ status: LoginStatus.LOGIN_SUCCESSFULLY, token });
};


export { login };