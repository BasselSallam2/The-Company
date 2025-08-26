import express from "express";
import  Appuse from "@utils/appUse.js";
import { globalErrorHandler } from "@utils/apiGolbalErrror.js";
import {ApiError} from "@utils/apiError.js";


const app = express();
Appuse(app);

app.all("*", (req, res, next) => {
    next(new ApiError(404  , "errors.notFound" , req.t, { url: req.originalUrl}));
});

app.use(globalErrorHandler);

export default app ;



