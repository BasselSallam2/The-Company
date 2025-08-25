import { CommonUserVlidator } from "@/shared/commonValidator.js";
import { ValidationChain } from "express-validator";
import { Permessions } from "@/utils/interfaces.js";



class UserVlidator extends CommonUserVlidator {
  constructor() {
    super();
  }

  static permessions(field: any): ValidationChain {
    let chain = field
      .notEmpty()
      .withMessage("permessions is required")
      .isArray()
      .withMessage("permessions must be an array")
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

}

export default UserVlidator;
