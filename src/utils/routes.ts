
import { Router } from "express";
import userRouter from "@modules/User/user.route.js";
import employeeRouter from "@modules/Employee/employee.route.js";
import overtimeRouter from "@modules/Overtime/overtime.route.js";



const router = Router();

router.use("/user", userRouter);
router.use("/employee", employeeRouter);
router.use("/overtime", overtimeRouter);


export default router;
