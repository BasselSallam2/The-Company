import { GenericServices } from "@/services/genericServices.js";
import { Model } from "mongoose";
import { IActivity } from "./activity.interface.js";
import { ActivityModel } from "./activity.schema.js";
import { ApiError } from "@/utils/apiError.js";
export class activityService extends GenericServices<IActivity> {
  constructor(model: Model<IActivity>) {
    super(model);
  }
}

export default new activityService(ActivityModel);
