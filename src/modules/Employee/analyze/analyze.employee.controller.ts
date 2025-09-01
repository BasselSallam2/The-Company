import {EmployeeController} from "@modules/Employee/employee.controller.js";
import employeeSearchService from "@modules/Employee/services/search/search.employee.serivce.js";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {ServiceResults} from "@modules/Employee/employee.interface.js";
import apiResponse from "@/utils/apiResponse.js";
import { PopulateOptions } from "mongoose";
import analyzeEmployeeSerivce from "./analyze.employee.serivce.js";



class EmployeeSearchController extends EmployeeController<typeof employeeSearchService> {
  constructor() {
    super(employeeSearchService);
  }

 public employeeAnalysis = expressAsyncHandler(async (req: Request, res: Response) => { 
      const t = req.t;
      const { id } = req.params;
     let { month, year } = req.query as { month?: string | number; year?: string | number };
      if (month && year) {
        month  = Number(month);
        year  = Number(year);
      }
      const employeeTotalDuration = await analyzeEmployeeSerivce.getEmployeeTotalDuration(id as string , month as number , year as number );
      if (employeeTotalDuration === ServiceResults.EMPTY) {
        apiResponse.notFound(res, t);
        return;
      }
      apiResponse.getOne(res, employeeTotalDuration);
      return;

  });


}




export default new EmployeeSearchController();
