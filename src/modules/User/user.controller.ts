import {GenericController} from "@shared/genericController.js";
import userService from "@modules/User/user.services.js";
import {getAllSanitize} from "@modules/User/user.sanitize.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import apiResponse from "@/utils/apiResponse.js";
import { logActivity, logActions } from "@modules/activity/activity.service.js";
import { NextFunction } from "express-serve-static-core";
import { ApiError } from "@/utils/apiError.js";


export class UserController extends GenericController<typeof userService> {

  constructor() {
    super(userService); 
    this.sanitizeOption = getAllSanitize
  }


  public updateProfile = asyncHandler(async (req: Request, res: Response) => {
      const t = req.t;
      const { id } = req.params;
      const { name , phoneNumber } = req.body;
      if (req.user) {
        const { _id } = req.user as { _id: string };
        logActivity({
          action: logActions.UPDATE,
          targetRef: this.service.modelName,
          target: id as string,
          actorRef: "User",
          actor: _id,
          data: { name , phoneNumber }
        });
      }
      const document = await this.service.updateById(id as string, { name , phoneNumber });
      if (!document) {
        apiResponse.notFound(res, t);
        return;
      }
      apiResponse.updateOne(res, t, document);
      return;
    });


     public updatePassword = asyncHandler(async (req: Request, res: Response) => {
      const t = req.t;
      const { id } = req.params;
      const { password , confirmPassword } = req.body;
      if (req.user) {
        const { _id } = req.user as { _id: string };
        logActivity({
          action: logActions.UPDATE,
          targetRef: this.service.modelName,
          target: id as string,
          actorRef: "User",
          actor: _id,
          data: { password , confirmPassword }
        });
      }
      const document = await this.service.updateById(id as string, { password , confirmPassword });
      if (!document) {
        apiResponse.notFound(res, t);
        return;
      }
      apiResponse.updateOne(res, t, document);
      return;
    });

         public updatePermessions = asyncHandler(async (req: Request, res: Response) => {
      const t = req.t;
      const { id } = req.params;
      const { permessions } = req.body;
      if (req.user) {
        const { _id } = req.user as { _id: string };
        logActivity({
          action: logActions.UPDATE,
          targetRef: this.service.modelName,
          target: id as string,
          actorRef: "User",
          actor: _id,
          data: { permessions }
        });
      }
      const document = await this.service.updateById(id as string, { permessions });
      if (!document) {
        apiResponse.notFound(res, t);
        return;
      }
      apiResponse.updateOne(res, t, document);
      return;
    });
    
    public getMe = asyncHandler(async (req: Request, res: Response , next: NextFunction) => {
      const t = req.t;
      const { _id } = req.user as { _id: string };
      const document = await this.service.Getme(_id);
      if (!document) {
        next(new ApiError(401, "errors.login.UNAUTHORIZED", t));
      }
      apiResponse.getOne(res, document);
      return;
    });
}




export default new UserController();
