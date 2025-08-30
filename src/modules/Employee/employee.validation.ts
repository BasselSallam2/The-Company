import { body, query } from "express-validator";
import {EmployeeVlidator}  from "@modules/Employee/employee.validatonRules.js";
import {validateResult} from "@/middlewares/ValidationRequest.js";


 const createEmployeeValidator = [
  EmployeeVlidator.text(body("name"), 3),
  EmployeeVlidator.text(body("phoneNumber"), 10),
  EmployeeVlidator.text(body("jobTitle"), 2),
  validateResult
];

 const updateEmployeeValidator = [
   EmployeeVlidator.text(body("name"), 3).optional(),
  EmployeeVlidator.text(body("phoneNumber"), 10).optional(),
  EmployeeVlidator.text(body("jobTitle"), 2).optional(),
  validateResult
];

export {
  createEmployeeValidator,
  updateEmployeeValidator,
};


