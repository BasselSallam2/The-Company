import { Router } from "express";
import userRouter from "@modules/User/user.route.js";
import employeRouter from "@modules/Employe/employe.route.js";
import RequestRouter from "@modules/Request/request.route.js";
import { clearCache } from "@cache/clearCache.js";
import { clearLOGS } from "./logger.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";
import authRouter from "@modules/auth/auth.route.js";
import searchRouter from "@/modules/Employe/services/search/search.employe.route.js";
import activityRouter from "@modules/activity/actitvity.route.js";
import EmployeAnalysisRouter from "@modules/Employe/analyze/analyze.employe.route.js";

const router = Router();

router.use("/user", userRouter);
router.use("/employe/analyze", EmployeAnalysisRouter);
router.use("/employe/auto-complete", searchRouter);
router.use("/employe", employeRouter);
router.use("/request", RequestRouter);
router.use("/auth", authRouter);
router.use("/activity", activityRouter);

router.get(
  "/clearCache",
  protect,
  allowedWith(Permessions.CACHECLEAR),
  clearCache
);
router.get("/clearLogs", protect, allowedWith(Permessions.LOGCLEAR), clearLOGS);

export default router;
