const jwt = require('jsonwebtoken');

// what is the use of next()
module.exports = function async (req, res, next) {
	 const token = req.header('auth-token');
	 if (!token) return res.status(401).json({ message: 'access denied'});

	 
	 	jwt.verify(token, process.env.TOKEN_SECRET, function(err, decodedToken) {
  				if (err) { 
  					return res.status(400).json({message: "Token Expired please re-login" });
  				}else {
            const { emailId, role, isApproved } = decodedToken;
            if (role !== 'admin' && !isApproved) {
                return res.status(403).json({ message: 'Unauthorized access.' });
            }
            req.decodedToken = decodedToken; // Attaching decoded token data to the request object
            next();
        }
  		});
};