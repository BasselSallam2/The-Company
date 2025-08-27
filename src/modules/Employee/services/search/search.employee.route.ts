import { Router } from "express";
import employeeController from "@modules/Employee/services/search/search.employee.controller.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";


const router = Router();


router.route("/").get(protect, allowedWith(Permessions.EMPLOYEEREAD), employeeController.searchEmployee);



export default router;
