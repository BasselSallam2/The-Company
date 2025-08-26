// auth.controller.ts
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import AuthService from "./auth.services.js";
import { ApiError } from "@/utils/apiError.js";
import apiResponse from "@/utils/apiResponse.js";

class AuthController {
  public login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { phoneNumber, password } = req.body;
    const t = req.t;

    const {token , safeUser} = await AuthService.login(phoneNumber, password, t);

    if (!token) {
      return next(new ApiError(401, "errors.login.UNAUTHORIZED", t));
    }

    
    res.status(200).json({user: safeUser , token});
    return ;
    
  });
}

export default new AuthController();
