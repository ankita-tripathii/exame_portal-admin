
const {GetPathFromUrl} = require('../utility');
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

                    const allowedRoutesForDeliveryHead = ['allassessment', 'allevent', 'allcandidate', 'allorganisation'];

                    const apiPath = req.originalUrl.split("/")[2];
                    const finalaApiPath = GetPathFromUrl(apiPath);
                    console.log(finalaApiPath);

                    // Access control logic
            if (role === 'admin' && isApproved) {
                req.decodedToken = decoded; // Attaching decoded token data to the request object
                next(); // Allow access for admin to all routes
            } else if (role === 'delivery_head' && isApproved && allowedRoutesForDeliveryHead.indexOf(finalaApiPath) !== -1) {
                req.decodedToken = decoded; // Attaching decoded token data to the request object
                next(); // Allow access for delivery_head to specific routes
            } else {
                return res.status(403).json({ message: 'Unauthorized access.' });
            }
                }
        });
};