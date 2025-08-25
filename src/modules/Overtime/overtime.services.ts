import GenericServices from "@/services/genericServices.js";
import { Document, Model } from "mongoose";
import Overtime from "@modules/Overtime/overtime.interface.js";
import OvertimeModel from "@modules/Overtime/overtime.model.js";
import { clearByPattern } from "@cache/cacheHelper.js";
import { OvertimeResponces } from "@modules/Overtime/overtime.interface.js";
import EmployeeModel from "@modules/Employee/employee.model.js";
class OvertimeService extends GenericServices<Overtime> {
  constructor(model: Model<Overtime>) {
    super(model);
  }

  public override async createOne(body: any , creator: string) {
    let {note , start , end , employee} = body;
    const isEmployeeExist = await EmployeeModel.findById(employee);
    if(!isEmployeeExist) {
      return OvertimeResponces.EMPLOYEE_NOT_FOUND ;
    } 
    start = new Date(start).toISOString();
    end = new Date(end).toISOString();
    console.log("service INPUTS" , note , start , end , employee , creator);
    let query = this.model.create({note , start , end , employee , creator});
    return query;
  }

  public override async updateById(id: string, body: any) {
        const cachePattern = `*${this.model.modelName}:${id}:*`;
        await clearByPattern(cachePattern);
        const query = await this.model
          .findByIdAndUpdate(id, body, { new: true })
          .exec();
        return query;
  }
}

export default new OvertimeService(OvertimeModel);
