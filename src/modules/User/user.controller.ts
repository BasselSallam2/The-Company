import GenericController from "@shared/genericController.js";
import userService from "@modules/User/user.services.js";
import UserSanitizer from "@modules/User/user.sanitize.js";


class UserController extends GenericController<any> {

  constructor() {
    super(userService); 
    this.sanitizeOption = UserSanitizer
  }
}

export default new UserController();
