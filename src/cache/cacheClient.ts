import type { RedisOptions } from "ioredis";

export function redisConnectionOptions(): RedisOptions {
  const redisUrl = new URL(
    "redis://default:9A9JZHho3YECKguKxxWoirSaRrapXe3k@redis-10772.crce176.me-central-1-1.ec2.redns.redis-cloud.com:10772"
  );

  return {
    username: redisUrl.username,
    password: redisUrl.password,
    host: redisUrl.hostname,
    port: parseInt(redisUrl.port, 10),
  };
}
