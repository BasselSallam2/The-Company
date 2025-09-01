import { EmployeService } from "@modules/Employe/employe.services.js";
import { IEmploye } from "@modules/Employe/employe.interface.js";
import { Model, PopulateOptions, Types } from "mongoose";
import { EmployeModel } from "@modules/Employe/employe.schema.js";
import { TFunction } from "i18next";
import { ApiError } from "@/utils/apiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiFeature from "@/utils/apiFeatures.js";
import { EmployeAnalysis } from "./analyze.employe.interface.js";
import { ServiceResults } from "@modules/Employe/employe.interface.js";
import { RequestModel } from "@/modules/Request/request.schema.js";

export class AnalyzeEmployeService extends EmployeService {
  constructor(model: Model<IEmploye>) {
    super(model);
  }

  public async getEmployeTotalDuration(
    employeId: string,
    month?: number,
    year?: number
  ): Promise<EmployeAnalysis | ServiceResults> {
    const matchFillter: any = { employe: new Types.ObjectId(employeId) };

    let period = "all-time";

    if (month) {
      const currentYear = new Date().getFullYear();
      const startOfMonth = new Date(year || currentYear, month - 1, 1);
      const endOfMonth = new Date(
        year || currentYear,
        month,
        0,
        23,
        59,
        59,
        999
      );
      matchFillter.start = { $gte: startOfMonth, $lte: endOfMonth };

      period = `${month.toString().padStart(2, "0")}-${year || currentYear}`;
    }

    const result = await RequestModel.aggregate([
      { $match: matchFillter },
      {
        $addFields: {
          duration: { $subtract: ["$end", "$start"] },
        },
      },
      {
        $group: {
          _id: "$employe",
          totalDuration: { $sum: "$duration" },
        },
      },
      {
        $lookup: {
          from: "employes",
          localField: "_id",
          foreignField: "_id",
          as: "employeData",
        },
      },
      { $unwind: "$employeData" },
      {
        $project: {
          name: "$employeData.name",
          phoneNumber: "$employeData.phoneNumber",
          jobTitle: "$employeData.jobTitle",
          totalDuration: 1,
        },
      },
    ]);

    if (!result.length) {
      const employe = await this.model
        .findById(employeId)
        .select("name jobTitle PhoneNumber")
        .lean()
        .exec();
      if (!employe) return ServiceResults.EMPTY;
      return {
        _id: employeId,
        totalDuration: 0,
        timeunit: "ms",
        period,
      } as EmployeAnalysis;
    }

    const finalResult: EmployeAnalysis = {
      _id: result[0]._id,
      totalDuration: result[0].totalDuration,
      timeunit: "ms",
      period,
    };

    return finalResult;
  }
}

export default new AnalyzeEmployeService(EmployeModel);
