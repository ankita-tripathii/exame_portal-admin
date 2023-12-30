const jwt = require('jsonwebtoken');

// what is the use of next()
module.exports = function async (req, res, next) {
	 const token = req.header('auth-token');
	 if (!token) return res.status(401).json({ message: 'access denied'});

	 
	 	jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
  				if (err) { 
  					return res.status(400).json({message: "Token Expired please re-login" });
  				}else {
                    const { emailId, role, isApproved } = decoded;

                    console.log("-----");
                    const apiPath = req.originalUrl.split("/")[2];
                    console.log(apiPath);

                    //createassessment -> only admin
                    // allassessment -> all 
                    if ( apiPath === "allassessment"  && ((['delivery_head'].indexOf(role) == -1) || !isApproved)) {
                        return res.status(403).json({ message: 'Unauthorized access.' });
                    }else if ( apiPath === "createassessment"  && ((['admin'].indexOf(role) == -1) || !isApproved)) {
                        return res.status(403).json({ message: 'Unauthorized access.' });
                    }

                    req.decodedToken = decoded; // Attaching decoded token data to the request object
                    next();
                }
  		});
};