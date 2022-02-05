const jwt = require("jsonwebtoken");
const secret = process.env.JWT_KEY;

const createToken = (userData) => {
  const token = jwt.sign(
    {
      userId: userData._id,
      name: userData.namw, 
      email: userData.email
    },
    secret,
    {
      expiresIn: "1h",
    }
  );
  return token;
};
module.exports = createToken;