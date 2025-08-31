import { GenericServices } from "@/services/genericServices.js";
import { Model ,Types } from "mongoose";
import { IEmployee , EmployeeAnalysis , ServiceResults } from "@modules/Employee/employee.interface.js";
import { EmployeeModel } from "@/modules/Employee/employee.schema.js";
import { RequestModel } from "@/modules/Request/request.schema.js";


export class EmployeeService extends GenericServices<IEmployee> {
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
      name: employee.name,
      phoneNumber: employee.phoneNumber,
      jobTitle: employee.jobTitle,
      totalDuration: 0,
      timeunit: "ms",
      period
    } as EmployeeAnalysis;
  }

  const finalResult : EmployeeAnalysis = {
    _id: result[0]._id,
    name: result[0].name,
    phoneNumber: result[0].phoneNumber,
    jobTitle: result[0].jobTitle,
    totalDuration: result[0].totalDuration,
    timeunit: "ms",
    period
  };

  return finalResult;
}

}

export default new EmployeeService(EmployeeModel);
