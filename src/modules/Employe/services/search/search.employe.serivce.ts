import { EmployeService } from "@modules/Employe/employe.services.js";
import { IEmploye } from "@modules/Employe/employe.interface.js";
import { Model, PopulateOptions } from "mongoose";
import { EmployeModel } from "@modules/Employe/employe.schema.js";
import { TFunction } from "i18next";
import { ApiError } from "@/utils/apiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiFeature from "@/utils/apiFeatures.js";

const tokenTTL = "1d";
export class SearchEmployeService extends EmployeService {
  constructor(model: Model<IEmploye>) {
    super(model);
  }

  public async employesSearch(
    reqQuery: any,
    populateOption?: PopulateOptions | PopulateOptions[],
    sanitizeOption?: string[],
    args?: any
  ) {
    let documentsCount = 0;

    documentsCount = await this.model.countDocuments({deleted: false});

    const filter: any = {};
    if (reqQuery.q && reqQuery.q !== "") {
      const qRaw = decodeURIComponent(String(reqQuery.q));
      const q = qRaw.trim();
      const regex = new RegExp(q, "i");
      filter.$and = [
        { $or: [
          { name: regex },
          { jobTitle: regex },
          { phoneNumber: regex },
        ] },
        { deleted: false },
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

export default new SearchEmployeService(EmployeModel);
