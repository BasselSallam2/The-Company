import { Router } from "express";
import {
    loginValidator,
    updateUserPasswordValidator,
    ForgetPasswrdValidator
} from "@modules/User/user.validation.js";

import { protect } from "@/middlewares/protect.js";
import authController from "./auth.controller.js";
import userController from "@modules/User/user.controller.js";
const router = Router();

router.route("/signin").post(loginValidator, authController.signin);
router.route("/me").get(protect, userController.getMe); 
router.route("/changePassword").put(protect, updateUserPasswordValidator , authController.updatePassword);
router.route("/forgetPassword").post(authController.forgetPassword);
router.route("/verifyResetCode").post(authController.verifyResetCode);
router.route("/resetPassword").post(ForgetPasswrdValidator , authController.resetPassword);



export default router;
