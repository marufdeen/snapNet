const patientModel = require("../models/citizenModel");

const patientDao = {
  async findAll() {
    const result = await patientModel.find();
    return result;
  },

  async findById(patientId) {
    const result = await patientModel
      .findById(patientId)
      .populate("appointments");
    return result;
  },

  async findByEmail(email) {
    const result = await patientModel.findOne({ email });
    return result;
  },

  async findByPhoneNumber(phoneNumber) {
    const result = await patientModel.findOne({ phoneNumber });
    return result;
  },

  async search(queryString) {
    const result = await patientModel
      .find()
      .or([
        { phoneNumber: { $in: queryString } },
        { regId: { $in: queryString } },
      ]);
    return result;
  },

  async create(data) {
    const newPatient = await patientModel.create(data);
    if (newPatient) return newPatient;
    return false;
  },

  async update(patientId, data) {
    const edit = await patientModel.updateOne({ _id: patientId }, data);
    if (edit) return this.findById(patientId);
    return false;
  },

  async remove(patientId) {
    await patientModel.deleteOne({ _id: patientId });
    return "Patient Deleted";
  },
};

module.exports = patientDao;
