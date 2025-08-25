import {IUser} from "@modules/User/user.interface.js";

const getAllSanitize: (keyof IUser)[] = [
  "password",
  "passwordResetCode",
  "passwordResetExpires",
  "passwordResetVerified",
];

export  {getAllSanitize};
