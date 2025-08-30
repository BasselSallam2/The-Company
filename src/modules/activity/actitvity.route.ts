import { Router } from "express";
import { protect , allowedWith } from "@/middlewares/protect.js";
import activityController from "./activity.controller.js";
import { Permessions } from "@/utils/interfaces.js";
const router = Router();

router
    .route("/")
    .get(protect, allowedWith(Permessions.ACTIVITYREAD), activityController.getAll);



export default router;
