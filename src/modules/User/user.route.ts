import { Router } from "express";
import {
  createUserValidator,
  loginValidator,
  updateUserValidator
} from "@/modules/User/user.validation.js";
import UserController from "@modules/User/user.controller.js";
import { login } from "./user.auth.service.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";
const router = Router();

router.route("/auth/login").post(loginValidator, login);
router
  .route("/")
  .post(protect, allowedWith(Permessions.USERCREATE), createUserValidator, UserController.createOne)
  .get(protect, allowedWith(Permessions.USERREAD), UserController.getAll);

router
  .route("/:id")
  .get(protect, allowedWith(Permessions.USERREAD), UserController.getOne)
  .put (updateUserValidator,  UserController.updateById)
  .delete(protect, allowedWith(Permessions.USERDELETE), UserController.deleteById);

export default router;
