import { GenericServices } from "@/services/genericServices.js";
import { Model, Types } from "mongoose";
import {
  IEmploye,
  ServiceResults,
} from "@modules/Employe/employe.interface.js";
import { EmployeModel } from "@/modules/Employe/employe.schema.js";
import { RequestModel } from "@/modules/Request/request.schema.js";

export class EmployeService extends GenericServices<IEmploye> {
  constructor(model: Model<IEmploye>) {
    super(model);
  }
}

export default new EmployeService(EmployeModel);
