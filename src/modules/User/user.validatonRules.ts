import { CommonUserVlidator } from "@/shared/commonValidator.js";
import { ValidationChain } from "express-validator";
import { Permessions } from "@/utils/interfaces.js";

class UserVlidator extends CommonUserVlidator {
  constructor() {
    super();
  }

  static permissions(field: any): ValidationChain {
    let chain = field
      .notEmpty()
      .withMessage("permissions is required")
      .isArray()
      .withMessage("permissions must be an array")
      .custom((arr: string[]) => {
        const validValues = Object.values(Permessions) as string[];
        for (const val of arr) {
          if (!validValues.includes(val)) {
            throw new Error(
              `Invalid permission: ${val}. Allowed: ${validValues.join(", ")}`
            );
          }
        }

        return true;
      });

    return chain;
  }

  static role(field: any): ValidationChain {
    let chain = field
      .notEmpty()
      .withMessage("role is required")
      .isIn(["Admin", "Manager", "HR"])
      .withMessage("role must be Admin, Manager or HR");
    return chain;
  }
}

export { UserVlidator };
