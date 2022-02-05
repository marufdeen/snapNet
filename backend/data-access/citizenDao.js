const citizenModel = require("../models/citizenModel");

const citizenDao = {
  async findAll() {
    const result = await citizenModel.find();
    return result;
  },

  async findById(patientId) {
    const result = await citizenModel
      .findById(patientId)
      .populate("appointments");
    return result;
  },
 
  async findByPhoneNumber(phoneNumber) {
    const result = await citizenModel.findOne({ phoneNumber });
    return result;
  }, 

  async create(data) {
    const newCitizen = await citizenModel.create(data);
    if (newCitizen) return newCitizen;
    return false;
  }, 
};

module.exports = citizenDao;
