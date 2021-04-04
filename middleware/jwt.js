const jwt = require("jsonwebtoken");
const { failed } = require("../config/response");

exports.checkToken = (req, res, next) => {
  let token = req.get("x-auth-token");
    console.log(token)
  if (!token) {
    return res.json(failed({ message: "Unauthorized." }));
  } else {
     //token = token.slice(7);
     console.log(token)
    jwt.verify(token, "shiftacademy", (err, decoded) => {
      console.log(decoded)
      if (err) {
        return res.json(failed({ message: err.message }));
      } else {
        req.auth = decoded;
        next();
      }
    });
  }
};