
import { Router } from "express";
import userRouter from "@modules/User/user.route.js";
import employeeRouter from "@modules/Employee/employee.route.js";
import overtimeRouter from "@modules/Overtime/overtime.route.js";
import { clearCache } from "@cache/clearCache.js";
import { protect , allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";



const router = Router();

router.use("/user", userRouter);
router.use("/employee", employeeRouter);
router.use("/overtime", overtimeRouter);
router.get("/clearCache", protect ,allowedWith(Permessions.CACHECLEAR) , clearCache);


export default router;
