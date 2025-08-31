import { Router } from "express";
import {
  createUserValidator,
  loginValidator,
  updateUserValidator,
  updateUserProfileValidator,
  updateUserPasswordValidator,
  dateUserPermissionsValidator,
} from "@/modules/User/user.validation.js";
import UserController from "@modules/User/user.controller.js";
import { protect, allowedWith } from "@/middlewares/protect.js";
import { Permessions } from "@/utils/interfaces.js";
const router = Router();

router
  .route("/")
  .post(
    protect,
    allowedWith(Permessions.USERCREATE),
    createUserValidator,
    UserController.createOne
  )
  .get(protect, allowedWith(Permessions.USERREAD), UserController.getAll);
  
  router
    .route("/profile")
    .put(
      protect,
      allowedWith(Permessions.USERUPDATE),
      updateUserProfileValidator,
      UserController.updateProfile
    );
    
router
  .route("/:id")
  .get(protect, allowedWith(Permessions.USERREAD), UserController.getOne)
  .put(updateUserValidator, UserController.updateById)
  .delete(
    protect,
    allowedWith(Permessions.USERDELETE),
    UserController.softDeleteById
  );


router
  .route("/permissions/:id")
  .put(
    protect,
    allowedWith(Permessions.USERUPDATE),
    dateUserPermissionsValidator,
    UserController.updatePermessions
  );

export default router;
