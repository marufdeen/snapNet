const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const citizenSchema = new Schema(
  { 
    name: String, 
    phoneNumber: String,  
    address: String, 
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    }, 
    registeredBy: String,
    ward: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Citizen", citizenSchema);
