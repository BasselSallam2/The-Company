import { EmployeController } from "@modules/Employe/employe.controller.js";
import employeSearchService from "@/modules/Employe/services/search/search.employe.serivce.js";
import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ServiceResults } from "@modules/Employe/employe.interface.js";
import apiResponse from "@/utils/apiResponse.js";
import { PopulateOptions } from "mongoose";

class EmployeSearchController extends EmployeController<
  typeof employeSearchService
> {
  constructor() {
    super(employeSearchService);
  }

  public searchEmploye = expressAsyncHandler(
    async (req: Request, res: Response) => {
      const query = req.query;
      let finalPopulate: PopulateOptions | PopulateOptions[] = [];
      if (query.populate) {
        finalPopulate = JSON.parse(query.populate as string);
      }

      const { documents, paginationResult } = await this.service.employesSearch(
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
    }
  );
}

export default new EmployeSearchController();
