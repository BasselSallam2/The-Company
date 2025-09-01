import { Router } from "express";
import employeController from "@modules/Employe/services/search/search.employe.controller.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";

const router = Router();

router
  .route("/")
  .get(
    protect,
    allowedWith(Permessions.EMPLOYEEREAD),
    employeController.searchEmploye
  );

export default router;
