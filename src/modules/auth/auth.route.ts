import e, { Router } from "express";
import {
    loginValidator,
} from "@modules/User/user.validation.js";
import { login } from "@modules/User/user.auth.service.js";
import { protect } from "@/middlewares/protect.js";
import userController from "@modules/User/user.controller.js";
const router = Router();

router.route("/login").post(loginValidator, login);
router.route("/me").get(protect, userController.getMe); 



export default router;
