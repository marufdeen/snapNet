const { userService } = require('../services')

class userController {
  /**
   * @author Maruf
   * @method  POST - register
   * @desc Feature: signs up the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async register(req, res) {
    try { 
      const user = await userService.register(req.body); 
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  } 

  /**
   * @author Maruf
   * @method  POST - login
   * @desc Feature: signs in the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async login(req, res) {
    try {
      const user = await userService.login(req.body); 
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }  
  

}

module.exports = userController;