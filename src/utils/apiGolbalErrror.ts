// middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import {ApiError} from "@/utils/apiError.js";
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
        return res.status(400).json({
            status: t("errors.fail"),
            message: `${field}: ${value} ${t("errors.taken") }`
        });
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    if( err instanceof MulterError ) {
        if (err.code === "LIMIT_UNEXPECTED_FILE" && err.message === "Unexpected field") {
      return res.status(400).json({
        success: false,
        message: `wrong field ${err.field} please use image for single image or images for multiple images`,
      });
    }
  
    }

    res.status(500).json({
        status: t("errors.error"),
        message: t("errors.worng")
    });
};
