const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

/**
 * Controller class for handling application-related operations
 * @class AppController
 */
class AppController {
  static async getStatus(req, res) {
    try {
      const redisStatus = await redisClient.isAlive();
      const dbStatus = await dbClient.isAlive();
      res.status(200).json({ redis: redisStatus, db: dbStatus });
    } catch (error) {
      console.error('Error getting status:', error);
      res.status(500).json({ error: 'Error getting status' });
    }
  }

  static async getStats(req, res) {
    try {
      const users = await dbClient.nbUsers();
      const files = await dbClient.nbFiles();
      res.status(200).json({ users, files });
    } catch (error) {
      console.error('Error getting stats:', error);
      res.status(500).json({ error: 'Error getting stats' });
    }
  }
}

module.exports = AppController;
