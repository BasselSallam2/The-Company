import { body, ValidationChain } from 'express-validator';

class Validator {
  static text(field: any, minLength: number = 3, maxLength?: number): ValidationChain {
    let chain = field
      .notEmpty().withMessage(`${field} is required`)
      .isString().withMessage(`${field} must be a string`)
      .isLength({ min: minLength }).withMessage(`${field} must be at least ${minLength} characters long`);

    if (maxLength) {
      chain = chain.isLength({ min: minLength, max: maxLength })
        .withMessage(`${field} must be between ${minLength} and ${maxLength} characters long`);
    }

    return chain;
  }

  static email(field: string): ValidationChain {
    return body(field)
      .isEmail().withMessage('Must be a valid email');
  }

  static gender(field: string): ValidationChain {
    return body(field)
      .notEmpty().withMessage('Gender is required')
      .isIn(['Male', 'Female']).withMessage('Gender must be Male or Female');
  }

  static phoneNumber(field: string, minimum: number): ValidationChain {
    return body(field)
      .notEmpty().withMessage(`${field} is required`)
      .isString().withMessage(`${field} must be a string`)
      .isLength({ min: minimum }).withMessage(`${field} must be at least ${minimum} digits long`);
  }

  static password(field: string, minimum: number): ValidationChain {
    return body(field)
      .notEmpty().withMessage('Password is required')
      .isString().withMessage('Password must be a string')
      .isLength({ min: minimum }).withMessage(`Password must be at least ${minimum} characters long`);
  }
}

export default Validator;
