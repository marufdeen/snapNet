const Joi = require("joi");

const validators = {};

validators.validateCitizenCreation = (patientData) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).pattern(new RegExp("^[a-zA-Z-]+$")).required().messages({
        "string.base": "Name must be string",
        "string.empty": "Name field is required",
        "string.min": "Name can not be less than three alphabetical characters",
        "string.max": "Name can not be more than forty alphabetical characters",
        "any.required": "Name field is required",
        "string.pattern.base": "Name can only be alpahebtical characters"
    }), 
    phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{11}$")).required().messages({
      'string.pattern.base': 'Phone number must have 11 digits.',
      'any.required': 'phoneNumber field is required'
    }), 
    address: Joi.string().required().messages({
      "any.required": "address field is required"
      }),
    dob:  Joi.date().max("now").required().messages({
      "date.base": "Not a valid date format (YYYY-MM-DD)",
      "any.required": "Date of birth is required",
      "date.max":  "Date of birth must be less than or equal to today"
    }),
    gender: Joi.string().required().valid('male', 'female', 'others').messages({
          "string.base": "gender with can only  be male, female, or others ",
          'any.required': 'gender field is required'
        }),
  });

  return schema.validate(patientData);
}; 

module.exports = validators;
