import { Document } from "mongoose";


interface IEmployee extends Document {
  name: string;
  phoneNumber: string;
  jobTitle: string;
  deleted: boolean
}

interface EmployeeAnalysis {
  _id: string;
  name: string;
  phoneNumber: string;
  jobTitle: string;
  totalDuration: number; 
  period: string; 
}

enum ServiceResults {
 EMPTY = "empty",
}



export  {IEmployee , EmployeeAnalysis , ServiceResults};
