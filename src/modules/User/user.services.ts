import {GenericServices} from "@/services/genericServices.js";
import { Model } from "mongoose";
import {IUser} from "@modules/User/user.interface.js";
import {UserModel} from "@modules/User/user.model.js";
class UserService extends GenericServices<IUser> {
  constructor(model: Model<IUser>) {
    super(model);
  }

}

export default new UserService(UserModel);
