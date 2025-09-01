import { EmployeeService } from "@modules/Employee/employee.services.js";
import { IEmployee } from "@modules/Employee/employee.interface.js";
import { Model, PopulateOptions , Types } from "mongoose";
import { EmployeeModel } from "@modules/Employee/employee.schema.js";
import { TFunction } from "i18next";
import { ApiError } from "@/utils/apiError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiFeature from "@/utils/apiFeatures.js";
import { EmployeeAnalysis } from "./analyze.employee.interface.js";
import { ServiceResults } from "@modules/Employee/employee.interface.js";
import  {RequestModel}  from "@/modules/Request/request.schema.js";


export class AnalyzeEmployeeService extends EmployeeService {
  constructor(model: Model<IEmployee>) {
    super(model);
  }

  public async getEmployeeTotalDuration(
  employeeId: string,
  month?: number, 
  year?: number  
): Promise<EmployeeAnalysis | ServiceResults> {
  const matchFillter: any = { employee: new Types.ObjectId(employeeId) };

  let period = "all-time";

  if (month) {
    const currentYear = new Date().getFullYear();
    const startOfMonth = new Date(year || currentYear, month - 1, 1);
    const endOfMonth = new Date(year || currentYear , month, 0, 23, 59, 59, 999);
    matchFillter.start = { $gte: startOfMonth, $lte: endOfMonth };

    period = `${month.toString().padStart(2, "0")}-${year || currentYear}`;
  }

  const result = await RequestModel.aggregate([
    { $match: matchFillter },
    {
      $addFields: {
        duration: { $subtract: ["$end", "$start"] }
      }
    },
    {
      $group: {
        _id: "$employee",
        totalDuration: { $sum: "$duration" }
      }
    },
    {
      $lookup: {
        from: "employees",
        localField: "_id",
        foreignField: "_id",
        as: "employeeData"
      }
    },
    { $unwind: "$employeeData" },
    {
      $project: {
        name: "$employeeData.name",
        phoneNumber: "$employeeData.phoneNumber",
        jobTitle: "$employeeData.jobTitle",
        totalDuration: 1
      }
    }
  ]);


  if (!result.length) {
    const employee = await this.model.findById(employeeId).select("name jobTitle PhoneNumber").lean().exec();
    if(!employee) return ServiceResults.EMPTY;
    return {
      _id: employeeId,
      totalDuration: 0,
      timeunit: "ms",
      period
    } as EmployeeAnalysis;
  }

  const finalResult : EmployeeAnalysis = {
    _id: result[0]._id,
    totalDuration: result[0].totalDuration,
    timeunit: "ms",
    period
  };

  return finalResult;
}

  
}

export default new AnalyzeEmployeeService(EmployeeModel);
