import {EmployeeController} from "@modules/Employee/employee.controller.js";
import employeeSearchService from "@modules/Employee/services/search/search.employee.serivce.js";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {ServiceResults} from "@modules/Employee/employee.interface.js";
import apiResponse from "@/utils/apiResponse.js";
import { PopulateOptions } from "mongoose";



class EmployeeSearchController extends EmployeeController<typeof employeeSearchService> {
  constructor() {
    super(employeeSearchService);
  }

public searchEmployee = expressAsyncHandler(async (req: Request, res: Response) => {
    const query = req.query;
    let finalPopulate: PopulateOptions | PopulateOptions[] = [];
    if (query.populate) {
      finalPopulate = JSON.parse(query.populate as string);
    }

    const { documents, paginationResult } = await this.service.employeesSearch(
      query,
      finalPopulate,
      this.sanitizeOption
    );
    if (!Array.isArray(documents) || documents.length === 0) {
      apiResponse.empty(res);
      return;
    }
    apiResponse.getMany(res, documents, paginationResult);
    return;
  });


}




export default new EmployeeSearchController();
