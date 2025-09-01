import { Router } from "express";
import employeController from "./employe.controller.js";
import {
  createEmployeValidator,
  updateEmployeValidator,
} from "./employe.validation.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";

const router = Router();

router
  .route("/")
  .post(
    protect,
    allowedWith(Permessions.EMPLOYEECREATE),
    createEmployeValidator,
    employeController.createOne
  )
  .get(
    protect,
    allowedWith(Permessions.EMPLOYEEREAD),
    employeController.getAll
  );

router
  .route("/:id")
  .get(protect, allowedWith(Permessions.EMPLOYEEREAD), employeController.getOne)
  .put(
    protect,
    allowedWith(Permessions.EMPLOYEEUPDATE),
    updateEmployeValidator,
    employeController.updateById
  )
  .delete(
    protect,
    allowedWith(Permessions.EMPLOYEEDELETE),
    employeController.softDeleteById
  );

export default router;
