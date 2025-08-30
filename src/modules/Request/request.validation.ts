import { body, query } from "express-validator";
import { RequestVlidator } from "@modules/Request/request.validatonRules.js";
import { validateResult } from "@/middlewares/ValidationRequest.js";

const createRequestValidator = [
  RequestVlidator.text(body("note"), 5).optional(),
  RequestVlidator.date(body("start")),
  RequestVlidator.date(body("end")),
  RequestVlidator.text(body("employee"), 5),
  validateResult,
];

const updateRequestValidator = [
  RequestVlidator.text(body("note"), 5).optional(),
  RequestVlidator.date(body("start")).optional(),
  RequestVlidator.date(body("end")).optional(),
  RequestVlidator.text(body("employee"), 5).optional(),
  validateResult,
];

export { createRequestValidator, updateRequestValidator };
