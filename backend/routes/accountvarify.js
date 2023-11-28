const jwt = require('jsonwebtoken');
const accountDetailModel = require('../model/account');

// what is the use of next()
module.exports = function async (req, res, next) {
	 const token = req.header('auth-token');
	 if (!token) return res.status(401).json({ message: 'access denied'});

	 
	 	jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
  				if (err) { 
  					return res.status(400).json({message: "Token Expired please re-login" });
  				}else{
  					req.body.emailIdQuery = decoded.emailId;
  					console.log(decoded.emailId);
  					req.body.role = decoded.role;

  					next();

  				}

  		});
};