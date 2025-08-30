import { Document } from "mongoose";


interface IUser extends Document {
  name: string;
  phoneNumber: string;
  password: string;
  jobTitle: string;
  role: "Admin" | "Manager" | "HR";
  permessions: string[];
  passwordResetCode: string;
  passwordResetExpires: Date; 
  passwordResetVerified: boolean;
  active: boolean; 
  deleted: boolean;
}

enum ServiceResults {
 EMPTY = "empty",
 "INVALID_RESET_CODE" = "INVALID_RESET_CODE",
 "RESET_CODE_EXPIRED" = "RESET_CODE_EXPIRED",
}




export  {IUser , ServiceResults};
