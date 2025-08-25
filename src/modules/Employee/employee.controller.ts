import GenericController from "@shared/genericController.js";
import employeeService from "@modules/Employee/employee.services.js";



class EmployeeController extends GenericController<any> {

  constructor() {
    super(employeeService); 
  }
}

export default new EmployeeController();
