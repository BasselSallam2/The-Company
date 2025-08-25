import GenericServices from "@/services/genericServices.js";
import { Model } from "mongoose";
import User from "@modules/User/user.interface.js";
import UserModel from "@modules/User/user.model.js";
class UserService extends GenericServices<User> {
  constructor(model: Model<User>) {
    super(model);
  }
}

export default new UserService(UserModel);
