import { Document } from "mongoose";


interface Employee extends Document {
  id: string;
  name: string;
  phone: string;
  jobTitle: string;
  deleted: boolean
}



export default Employee;
