import { Document , Schema} from "mongoose";


interface Overtime extends Document {
  id: Schema.Types.ObjectId;
  creator: Schema.Types.ObjectId;
  start: Date;
  end: Date;
  note?: string;
  employee: Schema.Types.ObjectId;
}

export enum OvertimeResponces {
  EMPLOYEE_NOT_FOUND = "the given employee id is not found",

}



export default Overtime;
