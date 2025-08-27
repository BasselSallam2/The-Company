import { Router } from "express";
import userRouter from "@modules/User/user.route.js";
import employeeRouter from "@modules/Employee/employee.route.js";
import RequestRouter from "@modules/Request/request.route.js";
import { clearCache } from "@cache/clearCache.js";
import { clearLOGS } from "./logger.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";
import authRouter from "@modules/auth/auth.route.js";
import searchRouter from "@modules/Employee/services/search/search.employee.route.js";

const router = Router();

router.use("/user", userRouter);
router.use("/employee/auto-complete", searchRouter);
router.use("/employee", employeeRouter);
router.use("/request", RequestRouter);
router.use("/auth", authRouter);

router.get(
  "/clearCache",
  protect,
  allowedWith(Permessions.CACHECLEAR),
  clearCache
);
router.get(
  "/clearLogs",
  protect,
  allowedWith(Permessions.LOGCLEAR),
  clearLOGS
);

export default router;
