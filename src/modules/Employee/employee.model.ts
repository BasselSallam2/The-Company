// src/models/User.ts
import { Schema, model, Document } from "mongoose";
import {IEmployee} from "@/modules/Employee/employee.interface.js";


const employeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    jobTitle: { type: String, required: true },
    deleted: { type: Boolean , default: false},
  },
  {
    timestamps: true,
  }
);




const EmployeeModel = model<IEmployee>("Employee", employeeSchema);



export  {EmployeeModel};
