import { body, query } from "express-validator";
import OverTimevalidator  from "@modules/Overtime/overtime.validatonRules.js";
import validateResult from "@/middlewares/ValidationRequest.js";


export const createOvertimeValidator = [
  OverTimevalidator.text(body("note"), 5),
  OverTimevalidator.date(body("start")),
  OverTimevalidator.date(body("end")),
  OverTimevalidator.text(body("employee"), 5),
  validateResult
];


export const updateOvertimeValidator = [
  OverTimevalidator.text(body("note"), 5).optional(),
  OverTimevalidator.date(body("start")).optional(),
  OverTimevalidator.date(body("end")).optional(),
   OverTimevalidator.text(body("employee"), 5).optional() ,
  validateResult
];



