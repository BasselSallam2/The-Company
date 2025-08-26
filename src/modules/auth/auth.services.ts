import {UserService} from "../User/user.services.js";
import { IUser } from "../User/user.interface.js";
import { Model } from "mongoose";
import { UserModel } from "../User/user.schema.js";
import { TFunction } from "i18next";
import { ApiError } from "@/utils/apiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const tokenTTL = "1d";
class AuthService extends UserService {

    
  constructor(model: Model<IUser>) {
    super(model);
  }

   public async login(phoneNumber: string, password: string, t: TFunction) {
    let user = await UserModel.findOne({ phoneNumber }).select("-__v -passwordResetCode -passwordResetExpires -passwordResetVerified -active -deleted -createdAt -updatedAt ").lean().exec();
    if (!user) {
      throw new ApiError(401, "errors.login.INVALID_CREDENTIALS", t);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, "errors.login.INVALID_CREDENTIALS", t);
    }

    if (user.active === false) {
      throw new ApiError(401, "errors.login.USER_NOT_ACTIVE", t);
    }

    if (user.deleted === true) {
      throw new ApiError(401, "errors.login.USER_DELETED", t);
    }

    const {password: Paswword , ...safeUser} = user ;
    const token = jwt.sign(
      { _id: user._id, permessions: user.permessions },
      process.env.JWT_SECRET as string,
      { expiresIn: tokenTTL }
    );

    return {token , safeUser};
  }
} 



  


export default new AuthService(UserModel);
