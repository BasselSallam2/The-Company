import GenericServices from "@/services/genericServices.js";
import { Model } from "mongoose";
import Employee from "@modules/Employee/employee.interface.js";
import EmployeeModel from "@modules/Employee/employee.model.js";
class EmployeeService extends GenericServices<Employee> {
  constructor(model: Model<Employee>) {
    super(model);
  }
}

export default new EmployeeService(EmployeeModel);
