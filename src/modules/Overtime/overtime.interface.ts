import { Document , Schema} from "mongoose";


interface IOvertime extends Document {
  creator: Schema.Types.ObjectId;
  start: Date;
  end: Date;
  note?: string;
  employee: Schema.Types.ObjectId;
}

 enum OvertimeResponces {
  EMPLOYEE_NOT_FOUND = "the given employee id is not found",

}



export  {IOvertime , OvertimeResponces};
