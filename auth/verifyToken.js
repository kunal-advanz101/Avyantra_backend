const config = require('../config/jwtConfig');
const jwt = require('jsonwebtoken');
const resHelper=require('../helper/res')

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
   // return res.status(403).send({ auth: false, message: 'No token provided.' });
     res.json(resHelper.noTokenProvided("No token provided"))

  jwt.verify(token, config.jwtSecret, function(err, decoded) {
    if (err)
      res.json(resHelper.failedAuthenticationToken("Failed to authenticate token"))
      // return res
      //   .status(500)
      //   .send({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
}
module.exports = verifyToken;
