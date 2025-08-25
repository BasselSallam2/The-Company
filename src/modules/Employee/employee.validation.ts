import { body, query } from "express-validator";
import EmployeeVlidator  from "@modules/Employee/employee.validatonRules.js";
import validateResult from "@/middlewares/ValidationRequest.js";


export const createEmployeeValidator = [
  EmployeeVlidator.text(body("name"), 3),
  EmployeeVlidator.Number(body("phone"), 10),
  EmployeeVlidator.text(body("jobTitle"), 2),
  validateResult
];

export const updateEmployeeValidator = [
   EmployeeVlidator.text(body("name"), 3).optional(),
  EmployeeVlidator.Number(body("phone"), 10).optional(),
  EmployeeVlidator.text(body("jobTitle"), 2).optional(),
  validateResult
];


