import e, { Router } from "express";
import {
    loginValidator,
} from "@modules/User/user.validation.js";

import { protect } from "@/middlewares/protect.js";
import authController from "./auth.controller.js";
import userController from "@modules/User/user.controller.js";
const router = Router();

router.route("/login").post(loginValidator, authController.login);
router.route("/me").get(protect, userController.getMe); 



export default router;
