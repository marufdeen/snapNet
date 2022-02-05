const validate = require("../helpers/citizenValidator");

class patient {
  constructor(citizenData) {
    this.citizenData = citizenData;
  }
  
  getName() {
    return this.citizenData.name;
  } 

  getAddress() {
    return this.citizenData.address;
  }  
  getGender() {
    return this.citizenData.gender;
  }
  
  getPhoneNumber() {
    return this.citizenData.phoneNumber;
  } 

  getWard() {
    return this.citizenData.ward;
  } 

  async validateCitizenCreation() {
    const { error } = await validate.validateCitizenCreation(this.citizenData);
    if (error) return error;
    return this;
  } 

}

module.exports = patient;
