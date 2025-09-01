import { GenericServices } from "@/services/genericServices.js";
import { Model ,Types } from "mongoose";
import { IEmployee  , ServiceResults } from "@modules/Employee/employee.interface.js";
import { EmployeeModel } from "@/modules/Employee/employee.schema.js";
import { RequestModel } from "@/modules/Request/request.schema.js";


export class EmployeeService extends GenericServices<IEmployee> {
  constructor(model: Model<IEmployee>) {
    super(model);
  }


}

export default new EmployeeService(EmployeeModel);
