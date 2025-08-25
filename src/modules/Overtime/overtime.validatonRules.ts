import { CommonValidator } from "@/shared/commonValidator.js";
import { ValidationChain } from "express-validator";


class OvertimeVlidator extends CommonValidator {
  constructor() {
    super();
  }

  static date(field: any): ValidationChain {
    let chain = field.isISO8601().toDate().withMessage("Must be a valid date");
    return chain;
  }


  }
export default OvertimeVlidator;
