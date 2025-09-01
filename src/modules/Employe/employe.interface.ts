import { Document } from "mongoose";

interface IEmploye extends Document {
  name: string;
  phoneNumber: string;
  jobTitle: string;
  deleted: boolean;
}

enum ServiceResults {
  EMPTY = "empty",
}

export { IEmploye, ServiceResults };
