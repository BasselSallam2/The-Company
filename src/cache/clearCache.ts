import { cache } from "./init.js";
import { Request, Response } from "express";

export const clearCache = async (req: Request, res: Response) => {
cache.clear();
return res.status(200).json({ message: "Cache cleared successfully" });
} 
