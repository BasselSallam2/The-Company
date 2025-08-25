import type { RedisOptions } from "ioredis";
export function redisConnectionOptions(): RedisOptions {
  return {
    username: "default",
    password: "9A9JZHho3YECKguKxxWoirSaRrapXe3k",
    host: "redis-10772.crce176.me-central-1-1.ec2.redns.redis-cloud.com",
    port: 10772,
    lazyConnect: true,
    showFriendlyErrorStack: true,
    keepAlive: 10_000,
    connectTimeout: 10_000,
  };
}
