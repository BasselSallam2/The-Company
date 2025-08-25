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



export  {IUser};
