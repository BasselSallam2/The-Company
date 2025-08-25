import { Query } from "mongoose";

 type paginateOBJ = {
  count: number;
  page: number;
  limit: number;
  pages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null ;
  lastPage: number;
  status: string;
  success: boolean;
  
 
};

class ApiFeature {
  private excludedFields: string[] = [];
  constructor(
    public MongooseQuery: Query<any, any>,
    public queryStr: Record<string, any>
  ) {
    this.MongooseQuery = MongooseQuery;
    this.queryStr = queryStr;
  }

  public paginationResult: paginateOBJ = {
  count: 0 ,
  page: 1,
  limit: 1,
  pages: 1,
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: 0,
  prevPage: 0,
  lastPage: 0,
  status: "",
  success: false
  
  };

  filter() {
    const queryObj: Record<string, any> = { ...this.queryStr };
    const excludedFields = ["page", "sort", "limit", "fields" , "populate"];
    excludedFields.forEach((element) => delete queryObj[element]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.MongooseQuery = this.MongooseQuery.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.MongooseQuery = this.MongooseQuery.sort(sortBy);
    } else {
      this.MongooseQuery = this.MongooseQuery.sort("-createdAt");
    }
    return this;
  }

 sanitize(fields: string[] | undefined) {
    if (!fields) return this;
    this.excludedFields = fields;
    return this;
  }

  select() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.MongooseQuery = this.MongooseQuery.select(`${fields} -_id`);
    } else {
      const excludeStr = this.excludedFields.map(f => `-${f}`).join(" ");
      this.MongooseQuery = this.MongooseQuery.select(`-__v ${excludeStr}`);
    }
    return this;
  }

  search(fields: string[]) {
    if (this.queryStr.keyword) {
      this.MongooseQuery = this.MongooseQuery.find({
        $or: fields.map((field) => ({
          [field]: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        })),
      });
    }
    return this;
  }

  paginate(countDocuments: number) {
    const page = Math.max(parseInt(this.queryStr.page) || 1, 1);
    const limit = Math.max(parseInt(this.queryStr.limit) || 20, 1);

    const adjustedLimit = Math.min(limit, countDocuments);

    const skip = (page - 1) * adjustedLimit;
    const endIndex = page * adjustedLimit;

    const pagination: paginateOBJ = {
      count: countDocuments,
      page,
      limit,
      pages: Math.ceil(countDocuments / adjustedLimit),
      hasNextPage: endIndex < countDocuments,
      hasPrevPage: page > 1,
      nextPage:  endIndex < countDocuments ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      lastPage: Math.ceil(countDocuments / adjustedLimit),
      status: "success",
      success: true
    };

    this.MongooseQuery = this.MongooseQuery.skip(skip).limit(adjustedLimit);
    this.paginationResult = pagination;

    return this;
  }
}

export default ApiFeature;