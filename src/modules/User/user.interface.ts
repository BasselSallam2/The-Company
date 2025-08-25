import { Document } from "mongoose";


interface User extends Document {
  id: string;
  name: string;
  phone: string;
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
