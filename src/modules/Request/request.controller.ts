import {GenericController} from "@shared/genericController.js";
import requestService from "@modules/Request/request.services.js";
import asyncHandler from "express-async-handler";
import { logActivity , logActions} from "../activity/activity.service.js";
import { Request, Response , NextFunction } from "express";
import apiResponse from "@/utils/apiResponse.js";
import { RequestResponces } from "@modules/Request/request.interface.js";
import {ApiError} from "@/utils/apiError.js";

class RequestController extends GenericController<any> {

  constructor() {
    super(requestService); 
  }

    public override createOne = asyncHandler(async (req: Request, res: Response , next: NextFunction) => {
      const t = req.t;
      const { body } = req;
      const {_id: createdBy } = req.user as { _id: string };
      const document = await this.service.createOne(body , createdBy);

      if (document === RequestResponces.EMPLOYEE_NOT_FOUND) {
       next(new ApiError(404  ,'errors.ID_NOT_FOUND' , t , { id: body.employee , modelName: 'Employee' }))
        return;
      }
          if (req.user) {
        const { _id } = req.user as { _id: string };
        logActivity({
          action: logActions.CREATE,
          targetRef: this.service.modelName,
          target: document._id as string,
          actorRef: "User",
          actor: _id,
          data: body
        });
      }
  
      apiResponse.success(res, t, 201, `Created_Successfully`, {
        id: document._id,
      });
      return;
    });




}

export default new RequestController();
