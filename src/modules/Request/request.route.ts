import { Router } from "express";
import RequestController from "./request.controller.js";
import {
  createRequestValidator,
  updateRequestValidator,
} from "./request.validation.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";

const router = Router();

router
  .route("/")
  .post(
    protect,
    allowedWith(Permessions.RequestCREATE),
    createRequestValidator,
    RequestController.createOne
  )
  .get(protect, allowedWith(Permessions.RequestREAD), RequestController.getAll);

router
  .route("/:id")
  .put(
    protect,
    allowedWith(Permessions.RequestUPDATE),
    updateRequestValidator,
    RequestController.updateById
  )
  .delete(
    protect,
    allowedWith(Permessions.RequestDELETE),
    RequestController.deleteById
  );

export default router;
