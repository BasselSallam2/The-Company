import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { GenericServices } from "@services/genericServices.js";
import apiResponse from "@/utils/apiResponse.js";
import { PopulateOption, PopulateOptions } from "mongoose";
import { logActivity, logActions } from "@modules/activity/activity.service.js";
import { Types } from "mongoose";
class GenericController<TService extends GenericServices<any>> {
  protected service: TService;
  public sanitizeOption?: string[];
  constructor(service: TService) {
    this.service = service;
  }

  public getAll = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query;
    let finalPopulate: PopulateOptions | PopulateOptions[] = [];
    if (query.populate) {
      finalPopulate = JSON.parse(query.populate as string);
    }

    const { documents, paginationResult } = await this.service.getAll(
      query,
      finalPopulate,
      this.sanitizeOption
    );
    if (!Array.isArray(documents) || documents.length === 0) {
      apiResponse.empty(res);
      return;
    }
    apiResponse.getMany(res, documents, paginationResult);
    return;
  });

  public getOne = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const { id } = req.params;
    const { query } = req;

    if (!id || !Types.ObjectId.isValid(id)) {
      apiResponse.notFound(res, t);
      return
    }

    let finalPopulate: PopulateOptions | PopulateOptions[] = [];
    if (query.populate) {
      finalPopulate = JSON.parse(query.populate as string);
    }
    let cache = false;
    if (query.cache) {
      cache = JSON.parse(query.cache as string);
    }

    const document = await this.service.getOne(id as string, {
      populateOption: finalPopulate,
      sanitizeOption: this.sanitizeOption,
      cache: cache,
    });
    if (!document) {
      apiResponse.notFound(res, t);
      return;
    }
    apiResponse.getOne(res, document);
    return;
  });

  public deleteById = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const { id } = req.params;

    if (!id || !Types.ObjectId.isValid(id)) {
      apiResponse.notFound(res, t);
      return
    }


    if (req.user) {
      const { _id } = req.user as { _id: string };
      if (id && _id) {
        logActivity({
          action: logActions.DELETE,
          targetRef: this.service.modelName,
          target: id as string,
          actorRef: "User",
          actor: _id,
        });
      }
    }

    const document = await this.service.deleteById(id as string);
    if (!document) {
      apiResponse.notFound(res, t);
      return;
    }
    apiResponse.deleteOne(res, t, id as string);
    return;
  });

  public softDeleteById = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const { id } = req.params;

    if (!id || !Types.ObjectId.isValid(id)) {
      apiResponse.notFound(res, t);
      return
    }

    if (req.user && id && id.length > 0) {
      const { _id } = req.user as { _id: string };
      logActivity({
        action: logActions.DELETE,
        targetRef: this.service.modelName,
        target: id as string,
        actorRef: "User",
        actor: _id,
      });
    }

    const document = await this.service.softDeleteById(id as string);

    if (!document) {
      console.log("efefef");
      apiResponse.notFound(res, t);
      return;
    }
    apiResponse.deleteOne(res, t, id as string);
    return;
  });

  public deleteMany = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const { body } = req;
    if (req.user) {
      const { _id } = req.user as { _id: string };
      logActivity({
        action: logActions.DELETE,
        targetRef: this.service.modelName,
        actorRef: "User",
        actor: _id,
        data: body,
      });
    }
    const document = await this.service.deleteMany(body);
    if (!document) {
      apiResponse.notFound(res, t);
      return;
    }
    apiResponse.deleteMany(res, t, document);
    return;
  });

  public updateById = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const { id } = req.params;
    const { body } = req;

    if (!id || !Types.ObjectId.isValid(id)) {
      apiResponse.notFound(res, t);
      return
    }

    
    if (req.user) {
      const { _id } = req.user as { _id: string };
      logActivity({
        action: logActions.UPDATE,
        targetRef: this.service.modelName,
        target: id as string,
        actorRef: "User",
        actor: _id,
        data: body,
      });
    }
    const document = await this.service.updateById(id as string, body);
    if (!document) {
      apiResponse.notFound(res, t);
      return;
    }
    apiResponse.updateOne(res, t, document);
    return;
  });

  public updateMany = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const { body, filter } = req.body;
    if (req.user) {
      const { _id } = req.user as { _id: string };
      logActivity({
        action: logActions.UPDATE,
        targetRef: this.service.modelName,
        actorRef: "User",
        actor: _id,
        data: body,
      });
    }
    const document = await this.service.updateMany(filter, body);
    if (document.matchedCount === 0) {
      apiResponse.updateManyNoMatch(res, t);
      return;
    }
    apiResponse.updateMany(res, t, document);
    return;
  });

  public createOne = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const { body } = req;
    const document = await this.service.createOne(body);

    if (req.user) {
      const { _id } = req.user as { _id: string };
      logActivity({
        action: logActions.CREATE,
        targetRef: this.service.modelName,
        target: document._id as string,
        actorRef: "User",
        actor: _id,
        data: body,
      });
    }

    apiResponse.success(res, t, 201, `Created_Successfully`, {
      id: document._id,
    });
    return;
  });

  public createMany = asyncHandler(async (req: Request, res: Response) => {
    const t = req.t;
    const { body } = req;
    if (req.user) {
      const { _id } = req.user as { _id: string };
      logActivity({
        action: logActions.CREATE,
        targetRef: this.service.modelName,
        actorRef: "User",
        actor: _id,
        data: body,
      });
    }
    const document = await this.service.createMany(body);
    apiResponse.success(res, t, 201, "Created_Successfully", document);
    return;
  });
}

export { GenericController };
