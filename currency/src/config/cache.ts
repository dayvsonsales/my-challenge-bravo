export default {
  redis: {
    host: process.env.REDIS_HOST || 'http://localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  resetTime: process.env.CACHE_RESET_TIME || 3600,
};
