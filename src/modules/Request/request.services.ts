import { GenericServices } from "@/services/genericServices.js";
import { Document, Model, PopulateOptions } from "mongoose";
import { IRequest } from "@modules/Request/request.interface.js";
import { RequestModel } from "@/modules/Request/request.schema.js";
import { clearByPattern } from "@cache/cacheHelper.js";
import { RequestResponces } from "@modules/Request/request.interface.js";
import { EmployeeModel } from "@/modules/Employee/employee.schema.js";
import ApiFeature from "@/utils/apiFeatures.js";
class RequestService extends GenericServices<IRequest> {
  constructor(model: Model<IRequest>) {
    super(model);
  }

  public override async createOne(body: any, createdBy: string) {
    let { note, start, end, employee } = body;
    const isEmployeeExist = await EmployeeModel.findById(employee);
    if (!isEmployeeExist) {
      return RequestResponces.EMPLOYEE_NOT_FOUND;
    }
    start = new Date(start).toISOString();
    end = new Date(end).toISOString();
    let query = this.model.create({ note, start, end, employee, createdBy });
    return query;
  }

  public override async updateById(id: string, body: any) {
    const cachePattern = `*${this.model.modelName}:${id}:*`;
    await clearByPattern(cachePattern);
    const query = await this.model
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
    return query;
  }

  public override async getAll(
    reqQuery: any,
    populateOption?: PopulateOptions | PopulateOptions[],
    sanitizeOption?: string[],
    args?: any
  ) {
    let documentsCount = 0;
    if(reqQuery.cache && reqQuery.cache === "true"){
      documentsCount = await this.model.countDocuments().cache();
    }else{
      documentsCount = await this.model.countDocuments();
    }
     
    let query = this.model.find();
    if (populateOption) {
      query = query.populate(populateOption);
    }
    const { MongooseQuery, paginationResult } = new ApiFeature(query, reqQuery)
      .filter()
      .sort()
      .sanitize(sanitizeOption)
      .select()
      .paginate(documentsCount);

    let documents = [] ;

    if(reqQuery.cache && reqQuery.cache === "true"){ 
      documents = await MongooseQuery.lean().cache().exec() as any[] ;
    }else{
      documents = await MongooseQuery.lean().exec() as any[] ;
    }

    if (documents.length > 0) {
      documents = documents.map((doc) => {
        return {
          ...doc,
          period: `${
            new Date(doc.end).getTime() - new Date(doc.start).getTime()
          }`,
        };
      });
    }

    return { documents, paginationResult };
  }
}

export default new RequestService(RequestModel);
