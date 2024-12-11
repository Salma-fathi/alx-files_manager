const redis = require('redis');

/**
 * Class to handle Redis client operations
 * @class RedisClient
 * @description Creates and manages a Redis client connection with methods for basic Redis operations
 * @property {Object} client - Redis client instance
 * @throws {Error} When Redis connection fails
 * @example
 * const redisClient = new RedisClient();
 * @methods
 * - isAlive(): Checks if connection is alive
 * - get(key): Gets value for a key
 * - set(key, value, duration): Sets key-value pair with expiration
 * - del(key): Deletes a key
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();

    this.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, 'EX', duration, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
