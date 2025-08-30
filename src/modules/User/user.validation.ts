import { body, query } from "express-validator";
import {UserVlidator} from "@/modules/User/user.validatonRules.js";
import {validateResult} from "@/middlewares/ValidationRequest.js";


 const createUserValidator = [
  UserVlidator.text(body("name"), 3),
  UserVlidator.text(body("phoneNumber"), 10),
  UserVlidator.text(body("password"), 6),
  UserVlidator.text(body("confirmPassword"), 6),
  UserVlidator.text(body("jobTitle"), 2),
  UserVlidator.role(body("role")),
  UserVlidator.permessions(body("permessions")),
  UserVlidator.confirmPassword(body("password"), "confirmPassword"),
  validateResult
];

 const updateUserValidator = [
  UserVlidator.text(body("name"), 3).optional(),
  UserVlidator.text(body("phoneNumber"), 10).optional(),
  UserVlidator.text(body("password"), 6).optional(),
  UserVlidator.text(body("confirmPassword"), 6).optional(),
  UserVlidator.text(body("jobTitle"), 2).optional(),
   UserVlidator.role(body("role")).optional(),
  UserVlidator.permessions(body("permessions")).optional(),
  UserVlidator.confirmPassword(body("password"), "confirmPassword").optional(),
  validateResult
];

 const updateUserProfileValidator = [
  UserVlidator.text(body("name"), 3).optional(),
  UserVlidator.text(body("phoneNumber"), 10).optional(),
  validateResult
];

 const updateUserPasswordValidator = [
  UserVlidator.text(body("password"), 6),
  UserVlidator.text(body("confirmPassword"), 6),
  UserVlidator.confirmPassword(body("password"), "confirmPassword"),
  validateResult
];

 const ForgetPasswrdValidator = [
  UserVlidator.text(body("newPassword"), 6),
  validateResult
];

const dateUserPermissionsValidator = [
  UserVlidator.permessions(body("permessions")),
  validateResult
];

 const loginValidator = [
  UserVlidator.text(body("phoneNumber"), 10),
  UserVlidator.text(body("password"), 6),
  validateResult
];


export {
  createUserValidator,
  updateUserValidator,
  loginValidator ,
  updateUserProfileValidator,
  updateUserPasswordValidator,
  dateUserPermissionsValidator,
  ForgetPasswrdValidator
};