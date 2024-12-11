/* eslint-disable import/no-named-as-default */
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';

/**
 * Authentication Controller Class
 * @class AuthController
 */

/**
 * Creates a new authentication token for a user
 * @static
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing the authentication token
 */

/**
 * Deletes an authentication token to disconnect user
 * @static
 * @async
 * @param {Object} req - Express request object
 * @param {string} req.headers['x-token'] - Authentication token to invalidate
 * @param {Object} res - Express response object
 * @returns {undefined} - Returns 204 status with no content
 */
export default class AuthController {
  static async getConnect(req, res) {
    const { user } = req;
    const token = uuidv4();

    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    res.status(200).json({ token });
  }

  static async getDisconnect(req, res) {
    const token = req.headers['x-token'];

    await redisClient.del(`auth_${token}`);
    res.status(204).send();
  }
}
