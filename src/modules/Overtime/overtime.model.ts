// src/models/User.ts
import { Schema, model, Document } from "mongoose";
import IOvertime from "@/modules/Overtime/overtime.interface.js";


const overtimeSchema = new Schema<IOvertime>(
  {
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    note: { type: String , default: null},
    employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  },
  {
    timestamps: true,
  }
);




const OvertimeModel = model<IOvertime>("Overtime", overtimeSchema);



export default OvertimeModel;
