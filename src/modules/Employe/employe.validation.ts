import { body, query } from "express-validator";
import { EmployeVlidator } from "@modules/Employe/employe.validatonRules.js";
import { validateResult } from "@/middlewares/ValidationRequest.js";

const createEmployeValidator = [
  EmployeVlidator.text(body("name"), 3),
  EmployeVlidator.text(body("phoneNumber"), 10),
  EmployeVlidator.text(body("jobTitle"), 2),
  validateResult,
];

const updateEmployeValidator = [
  EmployeVlidator.text(body("name"), 3).optional(),
  EmployeVlidator.text(body("phoneNumber"), 10).optional(),
  EmployeVlidator.text(body("jobTitle"), 2).optional(),
  validateResult,
];

export { createEmployeValidator, updateEmployeValidator };
