import { validationResult, ValidationError} from "express-validator";
import { Request, Response, NextFunction } from "express";

type Error =  {
  type: string;
  msg: string;
  path: string;
  location: string;
};

 function validateResult(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors: Error[] = errors.array() as Error[];
    if (extractedErrors.length > 0) {
      return res.status(400).json({
        ValidationError: {field: extractedErrors[0]?.path , message: extractedErrors[0]?.msg},
      });
    }
  }
  next();
}


export { validateResult };