// src/models/User.ts
import { Schema, model, Document } from "mongoose";
import { IRequest } from "@/modules/Request/request.interface.js";

const RequestSchema = new Schema<IRequest>(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    note: { type: String, default: null },
    employee: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  },
  {
    timestamps: true,
  }
);

const RequestModel = model<IRequest>("Request", RequestSchema);

export { RequestModel };
