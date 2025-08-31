import { EmployeeService } from "@modules/Employee/employee.services.js";
import { IEmployee } from "@modules/Employee/employee.interface.js";
import { Model, PopulateOptions } from "mongoose";
import { EmployeeModel } from "@modules/Employee/employee.schema.js";
import { TFunction } from "i18next";
import { ApiError } from "@/utils/apiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiFeature from "@/utils/apiFeatures.js";

const tokenTTL = "1d";
export class SearchEmployeeService extends EmployeeService {
  constructor(model: Model<IEmployee>) {
    super(model);
  }

  public async employeesSearch(
    reqQuery: any,
    populateOption?: PopulateOptions | PopulateOptions[],
    sanitizeOption?: string[],
    args?: any
  ) {
    let documentsCount = 0;

    documentsCount = await this.model.countDocuments().cache();

    const filter: any = {};
    if (reqQuery.q && reqQuery.q !== "") {
      const qRaw = decodeURIComponent(String(reqQuery.q));
      const q = qRaw.trim();
      const regex = new RegExp(q, "i");
      filter.$or = [
        { name: regex },
        { jobTitle: regex },
        { phoneNumber: regex },
      ];
    }

    let query = this.model.find(filter);
    if (populateOption) {
      query = query.populate(populateOption);
    }

    const { MongooseQuery, paginationResult } = new ApiFeature(query, reqQuery)
      .sort()
      .sanitize(sanitizeOption)
      .select()
      .paginate(documentsCount);

    let documents = [];

    documents = (await MongooseQuery.lean().cache().exec()) as any[];

    return { documents, paginationResult };
  }
}

export default new SearchEmployeeService(EmployeeModel);
