const citizenEntity = require("../entities/citizenEntity");
const userDao = require("../data-access/userDao"); 
const citizenDao = require("../data-access/citizenDao"); 

class citizenService {
  static async createCitizen(userId, citizenData) {
    try {
      // make a new patient object with inputed data
      const entity = new citizenEntity(citizenData);

      if(entity.getPhoneNumber() == entity.getContactPhone()) throw new Error("Patient and Contact person cannot share the same phone number"); 
      
      const errors = await entity.validateCitizenCreation(); 
      if (errors && errors.details) throw new Error (errors.details[0].message);
      const user = await userDao.findById(userId);
      const registeredBy = user.name; 
      // check if the phone number already exists
      const phoneNumberExist = await citizenDao.findByPhoneNumber(entity.getPhoneNumber());
      if (phoneNumberExist) throw new Error("Phone number already exist");

      // if patient does not exist, create the patient
      const patientCreated = await citizenDao.create({ 
        name: entity.getFirstName(),
        gender: entity.getGender(),  
        address: entity.getAddress(),   
        dob: entity.getDOB(),
        maritalStatus: entity.getMaritalStatus(),
        registeredBy
      });
      // if user failed to create, throw error
      if (!patientCreated) throw new Error("Patient not Created"); 
      return { patientCreated };
    } catch (error) {
      return { error: error.message };
    }
  }
 
   
  static async getAllCitizens() {
    try { 
      const citizenFound = await citizenDao.findAll();
      return { message: "success", citizenFound };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getSingleCitizen(patientId) {
    try {
      const citizenFound = await citizenDao.findById(patientId);
      if (!citizenFound) throw new Error("Sorry, patient not found!");

      return { message: "success", citizenFound };
    } catch (error) {
      return { error: error.message };
    }
  }
 
}

module.exports = citizenService;
