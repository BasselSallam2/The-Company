import {GenericController} from "@shared/genericController.js";
import activityServices from "./activity.services.js";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {ServiceResults} from "@modules/Employee/employee.interface.js";
import apiResponse from "@/utils/apiResponse.js";
import { GenericServices } from "@/services/genericServices.js";

                                                                                                                                                                                                                                      

export class ActivityController<TService extends GenericServices<any>> extends GenericController<TService> {
  constructor(service: TService) {
    super(service);
  }


}

export default new ActivityController(activityServices);
