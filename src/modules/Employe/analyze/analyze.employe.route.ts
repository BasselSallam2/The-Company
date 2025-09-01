import { Router } from "express";
import employeController from "@modules/Employe/analyze/analyze.employe.controller.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";

const router = Router();

router
  .route("/:id")
  .get(
    protect,
    allowedWith(Permessions.EMPLOYEEREAD),
    employeController.employeAnalysis
  );

export default router;
