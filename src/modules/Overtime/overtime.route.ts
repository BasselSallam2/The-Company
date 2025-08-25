import { Router } from "express";
import OvertimeController from "./overtime.controller.js";
import { createOvertimeValidator, updateOvertimeValidator } from "./overtime.validation.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";


const router = Router();

router.route("/")
.post(protect, allowedWith(Permessions.OVERTIMECREATE), createOvertimeValidator, OvertimeController.createOne)
.get(protect, allowedWith(Permessions.OVERTIMEREAD), OvertimeController.getAll);

router
  .route("/:id")
  .put(protect, allowedWith(Permessions.OVERTIMEUPDATE), updateOvertimeValidator, OvertimeController.updateById)
  .delete(protect, allowedWith(Permessions.OVERTIMEDELETE), OvertimeController.deleteById);

export default router;
