import { Document } from "mongoose";


interface User extends Document {
  _id: string;
  name: string;
  phoneNumber: string;
  password: string;
  jobTitle: string;
  permessions: string[];
  passwordResetCode: string;
  passwordResetExpires: Date; 
  passwordResetVerified: boolean;
  active: boolean; 
  deleted: boolean;
}



export default User;
