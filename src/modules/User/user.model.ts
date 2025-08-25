// src/models/User.ts
import { Schema, model, Document } from "mongoose";
import IUser from "@/modules/User/user.interface.js";
import { hashPasswordPlugin } from "@/shared/commonPlugins.js";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    jobTitle: { type: String, required: true },
    permessions: { type: [String], required: true },
    passwordResetCode: { type: String , default: null},
    passwordResetExpires: { type: Date , default: null},
    passwordResetVerified: { type: Boolean , default: false},
    active: { type: Boolean , default: true},
    deleted: { type: Boolean , default: false},
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(hashPasswordPlugin);



const UserModel = model<IUser>("User", userSchema);



export default UserModel;
