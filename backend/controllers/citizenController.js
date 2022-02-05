const { citizenService } = require("../services");

class citizenController {
  /**
   * @author Maruf
   * @method  POST - register
   * @desc Feature: create patient
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async createCitizen(req, res) {
    try {
      const { userId } = req.decoded;
      const patient = await citizenService.createCitizen(userId, req.body);
      return res.status(201).json(patient);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }  
  /** 
  /**
   * @author Maruf
   * @method  GET - getAllpatients
   * @desc Feature: Get All Users
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async getAllpatients(req, res) {
    try {
      const { queryString } = req.query;
      if (queryString) {
      const patientFound = await citizenService.searchPatient(queryString);
      return res.status(200).json(patientFound);
      }
      const patients = await citizenService.g();
      return res.status(200).json(patients);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * @author Maruf
   * @method  GET - getSinglePatient
   * @desc Feature: Get A specific patient
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async getSinglePatient(req, res) {
    try { 
      const { patientId } = req.params;
      const patient = await citizenService.getSinglePatient(patientId); 
      return res.status(200).json(patient);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  /**
   * @author Maruf
   * @method  DELETE - deletePatient
   * @desc Feature: Delete A specific patient
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns empty data
   */
  static async deletePatient(req, res) {
    try { 
      const { userId } = req.decoded;
      const { patientId } = req.params;
      const deleted = await citizenService.deletePatient(userId, patientId);
      return res.status(200).json(deleted);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = citizenController;
