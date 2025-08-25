import { body, query } from "express-validator";
import UserVlidator from "@/modules/User/user.validatonRules.js";
import validateResult from "@/middlewares/ValidationRequest.js";


export const createUserValidator = [
  UserVlidator.text(body("name"), 3),
  UserVlidator.Number(body("phoneNumber"), 10),
  UserVlidator.text(body("password"), 6),
  UserVlidator.text(body("confirmPassword"), 6),
  UserVlidator.text(body("jobTitle"), 2),
  UserVlidator.permessions(body("permessions")),
  UserVlidator.confirmPassword(body("password"), "confirmPassword"),
  validateResult
];

export const updateUserValidator = [
  UserVlidator.text(body("name"), 3).optional(),
  UserVlidator.Number(body("phoneNumber"), 10).optional(),
  UserVlidator.text(body("password"), 6).optional(),
  UserVlidator.text(body("confirmPassword"), 6).optional(),
  UserVlidator.text(body("jobTitle"), 2).optional(),
  UserVlidator.permessions(body("permessions")).optional(),
  UserVlidator.confirmPassword(body("password"), "confirmPassword").optional(),
  validateResult
];

export const loginValidator = [
  UserVlidator.Number(body("phoneNumber"), 10),
  UserVlidator.text(body("password"), 6),
  validateResult
];
