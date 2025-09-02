import { GenericServices } from "@/services/genericServices.js";
import { Model } from "mongoose";
import { IUser, ServiceResults } from "@modules/User/user.interface.js";
import { UserModel } from "@/modules/User/user.schema.js";
import { ApiError } from "@/utils/apiError.js";
export class UserService extends GenericServices<IUser> {
  constructor(model: Model<IUser>) {
    super(model);
  }

  public async Getme(id: string) {
    const me = await this.model
      .findById(id)
      .select("name jobTitle phoneNumber permissions")
      .lean()
      .cache()
      .exec();
    return me;
  }
}

export default new UserService(UserModel);
