import { CommonUserVlidator } from "@/shared/commonValidator.js";
import { ValidationChain } from "express-validator";

class EmployeVlidator extends CommonUserVlidator {
  constructor() {
    super();
  }
}

export { EmployeVlidator };
