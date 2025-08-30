// auth.controller.ts
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import AuthService from "./auth.services.js";
import { ApiError } from "@/utils/apiError.js";
import apiResponse from "@/utils/apiResponse.js";
import { Types } from "mongoose";
import { logActions, logActivity } from "../activity/activity.service.js";
import UserService from "../User/user.services.js";
import { ServiceResults } from "./auth.interface.js";

class AuthController {
  public login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { phoneNumber, password } = req.body;
      const t = req.t;

      const { token, safeUser } = await AuthService.login(
        phoneNumber,
        password,
        t
      );

      if (!token) {
        return next(new ApiError(401, "errors.login.UNAUTHORIZED", t));
      }

      res.status(200).json({ user: safeUser, token });
      return;
    }
  );

  public updatePassword = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const { _id } = req.user as { _id: string };
    const { password, confirmPassword } = req.body;

    if (!_id || !Types.ObjectId.isValid(_id)) {
      apiResponse.notFound(res, t);
      return;
    }

    logActivity({
      action: logActions.UPDATE,
      targetRef: "User",
      target: _id as string,
      actorRef: "User",
      actor: _id,
      data: { password, confirmPassword },
    });

    const document = await UserService.updateById(_id as string, {
      password,
      confirmPassword,
    });
    if (!document) {
      apiResponse.notFound(res, t);
      return;
    }
    apiResponse.updateOne(res, t, document);
    return;
  });

  public forgetPassword = asyncHandler(async (req: Request, res: Response , next: NextFunction) => {
    const t = req.t;
    const { phoneNumber } = req.body;
    const document = await AuthService.forgetPassword(phoneNumber);
    if (document === ServiceResults.EMPTY) {
      next(new ApiError(404  , "errors.USER_PHONENUMBER_NOTFOUND" , t));
      return 
    }
    apiResponse.success(res, t, 200, "ResetPasssword.OTP_SENT" , {restCode: document});
    return;

  });

  public verifyResetCode = asyncHandler(async (req: Request, res: Response , next: NextFunction) => {
    const t = req.t;
    const { phoneNumber , otp } = req.body;
    const document = await AuthService.verifyResetCode(phoneNumber , otp);
    if (document === ServiceResults.EMPTY) {
      next(new ApiError(404  , "errors.USER_PHONENUMBER_NOTFOUND" , t));
      return 
    }
    if(document === ServiceResults.INVALID_RESET_CODE) {
      next(new ApiError(404  , "ResetPasssword.INVALID_RESET_CODE" , t));
      return 
    }
    if(document === ServiceResults.RESET_CODE_EXPIRED) {
      next(new ApiError(404  , "ResetPasssword.OTP_EXPIRED" , t));
      return 
    }
    apiResponse.success(res, t, 200, "ResetPasssword.OTP_VERIFIED" );
    return;
  })

  public resetPassword = asyncHandler(async (req: Request, res: Response , next: NextFunction) => {
    const t = req.t;
    const { phoneNumber , newPassword } = req.body;
    const document = await AuthService.resetPassword(phoneNumber , newPassword);
    if (document === ServiceResults.EMPTY) {
      next(new ApiError(404  , "errors.USER_PHONENUMBER_NOTFOUND" , t));
      return 
    }
   if(document === ServiceResults.USER_NOT_VERIFIED) {
      next(new ApiError(404  , "ResetPasssword.USER_NOT_VERIFIED" , t));
      return 
    }
    apiResponse.success(res, t, 200, "ResetPasssword.PASSWORD_CHANGED" );
    return;
  })


}

export default new AuthController();
