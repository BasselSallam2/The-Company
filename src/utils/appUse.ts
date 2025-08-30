import type { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import express from "express";
import path from "path";

import appRoutes from "@utils/routes.js";
import {logger} from "@utils/logger.js";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import compression from "compression";
import mongooseSanitize from "express-mongo-sanitize";

import {i18next} from "@config/i18n.js";
import * as middleware from "i18next-http-middleware";



const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const speedLimiter = slowDown({
  windowMs: 60 * 1000,
  delayAfter: 50,
  delayMs: () => 500,
});

function Appuse(app: Express) {
  app.use(middleware.handle(i18next));

  app.use(express.json({ limit: "10Kb" }));
  app.use(express.urlencoded({ extended: true, limit: "10Kb" }));
  app.use(compression());
  app.use(cors());
  app.use(helmet());
  // app.use(rateLimiter);
  // app.use(speedLimiter);
  app.use(logger);
  app.use(mongooseSanitize());

  app.use("/api", appRoutes);
}

export default Appuse;
