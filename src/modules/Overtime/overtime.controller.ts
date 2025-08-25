import GenericController from "@shared/genericController.js";
import overtimeService from "@modules/Overtime/overtime.services.js";
import asyncHandler from "express-async-handler";
import { logActivity , logActions} from "../activity/activity.service.js";
import { Request, Response , NextFunction } from "express";
import apiResponse from "@/utils/apiResponse.js";
import { OvertimeResponces } from "@modules/Overtime/overtime.interface.js";
import ApiError from "@/utils/apiError.js";

class OvertimeController extends GenericController<any> {

  constructor() {
    super(overtimeService); 
  }

    public override createOne = asyncHandler(async (req: Request, res: Response , next: NextFunction) => {
      const t = req.t;
      const { body } = req;
      const {_id} = req.user as { _id: string };
      console.log("controller INPUTS" , body , _id);
      const document = await this.service.createOne(body , _id);

      if (document === OvertimeResponces.EMPLOYEE_NOT_FOUND) {
       next(new ApiError(404 , 'errors.ID_NOT_FOUND' , t , { id: body.employee , modelName: 'Employee' }))
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

export default new OvertimeController();
