import { Model, PopulateOptions } from "mongoose";
import ApiFeature from "@/utils/apiFeatures.js";
import {cache} from "@cache/init.js";
import { clearByPattern } from "@/cache/cacheHelper.js";
import { Document } from "mongoose";

 class GenericServices<T> {
  model: Model<T>;
  modelName: string;
  constructor(model: Model<T>) {
    this.model = model;
    this.modelName = model.modelName;
  }

  public async deleteById(id: string) {
    const cachePattern = `*${this.model.modelName}:${id}:*`;
    await clearByPattern(cachePattern);
    return this.model.findByIdAndDelete(id);
  }

  public softDeleteById(id: string) {
    const cachePattern = `${this.model.modelName}:${id}:*`;
    clearByPattern(cachePattern);
    let query = this.model.findByIdAndUpdate(id, {
      deleted: true,
    });
    return query;
  }

  public deleteMany(fillter: any) {
    const query = this.model.deleteMany(fillter);
    return query;
  }

  public async updateById(id: string, body: any , ...args: any[]) {
    const cachePattern = `*${this.model.modelName}:${id}:*`;
    await clearByPattern(cachePattern);
    const query = await this.model
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
    return query;
  }

  public updateMany(filter: any, body: any) {
    const query = this.model.updateMany(filter, body);
    return query;
  }

  public createOne(body: any, ...args: any[]): any{
    const query = this.model.create(body)  ;
    return query;
  }

  public createMany(body: any) {
    return this.model.create(body);
  }

public async getOne(
  id: string,
  options?: {
    populateOption?: any;
    sanitizeOption?: string[];
    selectOption?: string[];
  }
) {
  const { populateOption, sanitizeOption, selectOption } = options || {};

  const chacheKey = `${this.model.modelName}:${id}:${JSON.stringify(populateOption)}`;

  let query = this.model.findById(id);

  if (selectOption) {
    query = query.select(selectOption);
  }

  if (populateOption) {
    query = query.populate(populateOption);
  }

  if (sanitizeOption) {
    let sanatizeStr = sanitizeOption.map((f) => `-${f}`).join(" ") + " -__v";
    query = query.select(sanatizeStr);
  }

  return query.cache("10 minutes", chacheKey).lean().exec();
}

  public async getAll(
    reqQuery: any,
    populateOption?: PopulateOptions | PopulateOptions[],
    sanitizeOption?: string[],
    args?: any
  ) {
    const documentsCount = await this.model.countDocuments().cache();
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

    let documents = await MongooseQuery.lean().cache().exec();
    return { documents, paginationResult };
  }
}

export  {GenericServices};
