import {GenericController} from "@shared/genericController.js";
import employeeService from "@modules/Employee/employee.services.js";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {ServiceResults} from "@modules/Employee/employee.interface.js";
import apiResponse from "@/utils/apiResponse.js";
import { GenericServices } from "@/services/genericServices.js";

                                                                                                                                                                                                                                      

export class EmployeeController<TService extends GenericServices<any>> extends GenericController<TService> {
  constructor(service: TService) {
    super(service);
  }

  public employeeAnalysis = expressAsyncHandler(async (req: Request, res: Response) => { 
      const t = req.t;
      const { id } = req.params;
     let { month, year } = req.query as { month?: string | number; year?: string | number };
      if (month && year) {
        month  = Number(month);
        year  = Number(year);
      }
      const employeeTotalDuration = await employeeService.getEmployeeTotalDuration(id as string , month as number , year as number );
      if (employeeTotalDuration === ServiceResults.EMPTY) {
        apiResponse.notFound(res, t);
        return;
      }
      res.status(200).json(employeeTotalDuration);
      return;

  });
}

export default new EmployeeController(employeeService);
