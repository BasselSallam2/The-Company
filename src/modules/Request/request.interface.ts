import { Document , Schema} from "mongoose";


interface IRequest extends Document {
  createdBy: Schema.Types.ObjectId;
  start: Date;
  end: Date;
  note?: string;
  employee: Schema.Types.ObjectId;
}

 enum RequestResponces {
  EMPLOYEE_NOT_FOUND = "the given employee id is not found",

}



export  {IRequest , RequestResponces};
