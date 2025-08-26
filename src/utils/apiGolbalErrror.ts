// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/apiError.js";
import { MulterError } from "multer";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  const t = req.t;

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0] as string;
    const value = err.keyValue[field];
    return new ApiError(409, "errors.VALIDATION", t, { field, value });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      action: err.action,
      success: err.success,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  if (err instanceof MulterError) {
    if (
      err.code === "LIMIT_UNEXPECTED_FILE" &&
      err.message === "Unexpected field"
    ) {
      return new ApiError(400, "errors.Multer", t, { field: err.field });
    }
  }

  res.status(500).json({
    status: t("errors.error"),
    action: null,
    success: false,
    statusCode: 500,
    message: t("errors.worng"),
  });
};
