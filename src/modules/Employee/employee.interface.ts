import { Document } from "mongoose";


interface IEmployee extends Document {
  name: string;
  phoneNumber: string;
  jobTitle: string;
  deleted: boolean
}



enum ServiceResults {
 EMPTY = "empty",
}



export  {IEmployee  , ServiceResults};
