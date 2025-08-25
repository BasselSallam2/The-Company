import {GenericServices} from "@/services/genericServices.js";
import { Model } from "mongoose";
import {IEmployee} from "@modules/Employee/employee.interface.js";
import {EmployeeModel} from "@modules/Employee/employee.model.js";
class EmployeeService extends GenericServices<IEmployee> {
  constructor(model: Model<IEmployee>) {
    super(model);
  }
}

export default new EmployeeService(EmployeeModel);
