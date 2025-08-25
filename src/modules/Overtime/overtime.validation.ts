import { body, query } from "express-validator";
import { OvertimeVlidator } from "@modules/Overtime/overtime.validatonRules.js";
import { validateResult } from "@/middlewares/ValidationRequest.js";

const createOvertimeValidator = [
  OvertimeVlidator.text(body("note"), 5),
  OvertimeVlidator.date(body("start")),
  OvertimeVlidator.date(body("end")),
  OvertimeVlidator.text(body("employee"), 5),
  validateResult,
];

const updateOvertimeValidator = [
  OvertimeVlidator.text(body("note"), 5).optional(),
  OvertimeVlidator.date(body("start")).optional(),
  OvertimeVlidator.date(body("end")).optional(),
  OvertimeVlidator.text(body("employee"), 5).optional(),
  validateResult,
];

export { createOvertimeValidator, updateOvertimeValidator };
