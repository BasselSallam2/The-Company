import { Router } from "express";
import employeeController from "@modules/Employee/analyze/analyze.employee.controller.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";


const router = Router();


router.route("/:id").get(protect, allowedWith(Permessions.EMPLOYEEREAD), employeeController.employeeAnalysis);



export default router;
