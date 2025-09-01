import { GenericController } from "@shared/genericController.js";
import employeService from "@modules/Employe/employe.services.js";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ServiceResults } from "@modules/Employe/employe.interface.js";
import apiResponse from "@/utils/apiResponse.js";
import { GenericServices } from "@/services/genericServices.js";

export class EmployeController<
  TService extends GenericServices<any>
> extends GenericController<TService> {
  constructor(service: TService) {
    super(service);
  }
}

export default new EmployeController(employeService);
