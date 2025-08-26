import { cache } from "./init.js";
import { Request, Response } from "express";
import apiResponse from "@/utils/apiResponse.js";

export const clearCache = async (req: Request, res: Response) => {
cache.clear();
return apiResponse.success(res, req.t, 200, "cache_cleared");

} 
