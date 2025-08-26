// src/models/User.ts
import { Schema, model, Document } from "mongoose";
import {IActivity} from "@modules/activity/activity.interface.js";


const activitySchema = new Schema<IActivity>(
  {
    actorRef: { type: String, required: true },
    actor: { type: Schema.Types.ObjectId, refPath: "userType", required: true },
    action: { type: String, required: true, enum: ["CREATE", "UPDATE", "DELETE"] },
    targetRef: { type: String  }, 
    target: { type: Schema.Types.ObjectId, refPath: "targetRef", required: true },
    data: { type: Object },
  },
  {
    timestamps: true,
  }
);






const ActivityModel = model<IActivity>("Activity", activitySchema);


export  {ActivityModel};
