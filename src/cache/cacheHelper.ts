
import {Redis} from "ioredis";
import {redisConnectionOptions} from "@cache/cacheClient.js"

const redis = new Redis(redisConnectionOptions()) ;
export async function clearByPattern(pattern: string) {
  let cursor = "0";
  do {
    const [nextCursor, keys] = await redis.scan(cursor, "MATCH", pattern, "COUNT", 100);
    cursor = nextCursor;
    if (keys.length > 0) {
      await redis.del(keys);
      console.log(`Deleted ${keys.length} keys matching ${pattern}`);
    }
  } while (cursor !== "0");
}
