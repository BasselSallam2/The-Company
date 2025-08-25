import Cache from "ts-cache-mongoose";
import { redisConnectionOptions } from "@/cache/cacheClient.js";
import mongoose from "mongoose";

const cache = Cache.init(mongoose, {
      defaultTTL: "60 seconds",
      engine: "redis",
      engineOptions: redisConnectionOptions() as any,
      debug: true,
    });



export default cache ;