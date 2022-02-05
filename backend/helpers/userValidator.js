const Joi = require("joi");

const validators = {};

validators.validateUserSignUp = (userData) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(40).pattern(new RegExp("^[a-zA-Z-]+$")).required().messages({
      "string.base": "Name must be string",
      "string.empty": "Name field is required",
      "string.min": "Name can not be less than three alphabetical characters",
      "string.max": "Name can not be more than forty alphabetical characters",
      "any.required": "Name field is required",
      "string.pattern.base": "Name can only be alpahebtical characters"
  }),   
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email": "Not a valid email",
      "string.base": "Not a valid email",
      "string.empty": "Email field is required",
      "any.required": "Email field is required"
    }),
    password: Joi.string().min(3).max(225).required().messages({
      'string.min': 'Password can not be less than three characters',
      'string.empty': 'Password can not be empty'
    }), 
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      'any.only': 'passwords do not match',
      "any.required": "Confirm Password field is required"
    }), 
  });

  return schema.validate(userData);
}; 

validators.validateUserLogin = (userData) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.email": "Not a valid email",
      "string.base": "Not a valid email",
      "string.empty": "Email field is required",
      "any.required": "Email field is required"
    }),
    password: Joi.string().min(3).max(225).required().messages({
      'string.min': 'password can not be less than three characters',
      "any.required": "password field is required"
    }),
  });

  return schema.validate(userData);
}; 
module.exports = validators;
