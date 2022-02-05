const jwt = require("jsonwebtoken");

const secret = process.env.JWT_KEY;

const verifyToken = (req, res, next) => {
  const header =
    req.headers.Authorization ||
    req.headers.authorization ||
    req.query.Authorization;
  if (typeof header !== "undefined") {
    try {
      // const token = header; // With React
      const token = header.split(" ")[1]; // Without React
      req.decoded = jwt.verify(token, secret);
      next();
    } catch (error) {
      return res.send("Auth failed");
    }
  } else {
    return res.status(401).send("Token not provided");
  }
};

module.exports = verifyToken;
