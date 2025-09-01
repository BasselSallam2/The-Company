import { Document, Schema } from "mongoose";

interface IRequest extends Document {
  createdBy: Schema.Types.ObjectId;
  start: Date;
  end: Date;
  note?: string;
  employe: Schema.Types.ObjectId;
}

enum RequestResponces {
  EMPLOYEE_NOT_FOUND = "the given employe id is not found",
}

export { IRequest, RequestResponces };
