// src/models/User.ts
import { Schema, model, Document } from "mongoose";
import { IEmploye } from "@/modules/Employe/employe.interface.js";

const employeSchema = new Schema<IEmploye>(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    jobTitle: { type: String, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const EmployeModel = model<IEmploye>("Employe", employeSchema);

export { EmployeModel };
