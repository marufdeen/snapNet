const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const patientSchema = new Schema(
  { 
    name: String, 
    phoneNumber: String,  
    address: String, 
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    }, 
    registeredBy: String,
    ward: { type: Schema.Types.ObjectId, ref: "Ward" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
