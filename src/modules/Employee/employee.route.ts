import { Router } from "express";
import employeeController from "./employee.controller.js";
import {
  createEmployeeValidator,
  updateEmployeeValidator,
} from "./employee.validation.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";

const router = Router();

router
  .route("/")
  .post(
    protect,
    allowedWith(Permessions.EMPLOYEECREATE),
    createEmployeeValidator,
    employeeController.createOne
  )
  .get(protect ,allowedWith(Permessions.EMPLOYEEREAD),employeeController.getAll);

router
  .route("/:id")
  .get(protect, allowedWith(Permessions.EMPLOYEEREAD), employeeController.employeeAnalysis)
  .put(
    protect,
    allowedWith(Permessions.EMPLOYEEUPDATE),
    updateEmployeeValidator,
    employeeController.updateById
  )
  .delete(
    protect,
    allowedWith(Permessions.EMPLOYEEDELETE),
    employeeController.deleteById
  );

export default router;
