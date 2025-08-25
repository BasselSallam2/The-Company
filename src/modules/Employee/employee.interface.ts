import { Document } from "mongoose";


interface IEmployee extends Document {
  name: string;
  phoneNumber: string;
  jobTitle: string;
  deleted: boolean
}



export  {IEmployee};
