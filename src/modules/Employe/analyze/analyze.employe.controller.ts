import { EmployeController } from "@modules/Employe/employe.controller.js";
import employeSearchService from "@modules/Employe/services/search/search.employe.serivce.js";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ServiceResults } from "@modules/Employe/employe.interface.js";
import apiResponse from "@/utils/apiResponse.js";
import { PopulateOptions } from "mongoose";
import analyzeEmployeSerivce from "./analyze.employe.serivce.js";

class EmployeSearchController extends EmployeController<
  typeof employeSearchService
> {
  constructor() {
    super(employeSearchService);
  }

  public employeAnalysis = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const t = req.t;
      const { id } = req.params;
      let { month, year } = req.query as {
        month?: string | number;
        year?: string | number;
      };
      if (month && year) {
        month = Number(month);
        year = Number(year);
      }
      const employeTotalDuration =
        await analyzeEmployeSerivce.getEmployeTotalDuration(
          id as string,
          month as number,
          year as number
        );
      if (employeTotalDuration === ServiceResults.EMPTY) {
        apiResponse.notFound(res, t);
        return;
      }
      apiResponse.getOne(res, employeTotalDuration);
      return;
    }
  );
}

export default new EmployeSearchController();
