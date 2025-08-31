import { UserService } from "../User/user.services.js";
import { IUser } from "../User/user.interface.js";
import { Model } from "mongoose";
import { UserModel } from "../User/user.schema.js";
import { TFunction } from "i18next";
import { ApiError } from "@/utils/apiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ServiceResults } from "./auth.interface.js";


const tokenTTL = "1d";
class AuthService extends UserService {
  constructor(model: Model<IUser>) {
    super(model);
  }

  public async login(phoneNumber: string, password: string, t: TFunction) {
    let user = await UserModel.findOne({ phoneNumber })
      .select(
        "-__v -passwordResetCode -passwordResetExpires -passwordResetVerified -active -deleted -createdAt -updatedAt "
      )
      .lean()
      .exec();
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

    const { password: Paswword, ...safeUser } = user;
    const token = jwt.sign(
      { _id: user._id, permessions: user.permessions },
      process.env.JWT_SECRET as string,
      { expiresIn: tokenTTL }
    );

    return { token, safeUser };
  }

  public async forgetPassword(phoneNumber: string) {
    const user = await this.model.findOne({ phoneNumber }).lean().exec();
    if (!user) {
      return ServiceResults.EMPTY;
    }
    const passwordResetCode = Math.floor(1000 + Math.random() * 9000);
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    const updateUser = await this.model.findByIdAndUpdate(user._id, {
      passwordResetCode,
      passwordResetExpires,
      passwordResetVerified: false,
    });

    console.log(passwordResetCode);
    return passwordResetCode;
  }

  public async verifyResetCode(phoneNumber: string, passwordResetCode: string) {
    const user = await this.model.findOne({ phoneNumber }).lean().exec();
    if (!user) {
      return ServiceResults.EMPTY;
    }
    if (user.passwordResetCode !== passwordResetCode) {
      return ServiceResults.INVALID_RESET_CODE;
    }
    if (user.passwordResetExpires < new Date()) {
      return ServiceResults.RESET_CODE_EXPIRED;
    }
    const updateUser = await this.model.findByIdAndUpdate(user._id, {
      passwordResetVerified: true,
    });
    return user;
  }

  public async resetPassword(phoneNumber: string, newPassword: string) {
    const user = await this.model.findOne({ phoneNumber }).lean().exec();
    if (!user) {
      return ServiceResults.EMPTY;
    }
    if (user.passwordResetVerified !== true) {
      return ServiceResults.USER_NOT_VERIFIED;
    }

    const updateUser = await this.model.findByIdAndUpdate(user._id, {
      passwordResetExpires: null,
      passwordResetVerified: false,
      passwordResetCode: null,
      password: newPassword,
    });

    return updateUser;
  }

  public async changePassword(_id: string, oldPassword: string, newPassword: string ) {
    const user = await this.model.findById(_id).select("password").lean().exec();
    if (!user) {
      return ServiceResults.EMPTY;
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return ServiceResults.INVALID_PASSWORD;
    }
    const updateUser = await this.model.findByIdAndUpdate(_id, {
      password: newPassword,
    });
    return updateUser;
    
  }
}

export default new AuthService(UserModel);
