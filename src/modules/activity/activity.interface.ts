import { Document , Schema } from "mongoose";


 interface IActivity extends Document {
  id: string;
  actorRef: string;
  actor: Schema.Types.ObjectId;
  action: "CREATE" | "UPDATE" | "DELETE";
  targetRef: string;
  target: Schema;
  data?: Record<string, any>;
}

export { IActivity };



