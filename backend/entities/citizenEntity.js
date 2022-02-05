const validate = require("../helpers/citizenValidator");

class patient {
  constructor(patientData) {
    this.patientData = patientData;
  }
  
  getName() {
    return this.patientData.name;
  } 

  getAddress() {
    return this.patientData.address;
  }  
  getGender() {
    return this.patientData.gender;
  }
  
  getPhoneNumber() {
    return this.patientData.phoneNumber;
  } 

  getWard() {
    return this.patientData.ward;
  } 

  async validateCitizenCreation() {
    const { error } = await validate.validateCitizenCreation(this.patientData);
    if (error) return error;
    return this;
  } 

}

module.exports = patient;
