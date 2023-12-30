//Require module
const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors'); //new add
const routes = require('./routes/routes');
const accountdashboard = require('./routes/accountdashboard');
const accountDetailModel = require('./models/account');

require('dotenv').config();   //new add

const mongoString = process.env.DATABASE_URL   //new add


// Enable CORS for all routes


// Express Initialize
const app = express();

app.use(express.json());

app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true // Enable credentials (if needed)
}));


const port = process.env.PORT; // on the server this port number should be free

app.listen(port,()=> {
	
	try{
		mongoose.connect(mongoString).catch((e) => {
			console.log("error connecting to mongoose!");
		});
		         //new add
		const database = mongoose.connection;     //new add
		
		// Callbacks ?
		database.on('error', (error) => {       //new add
			console.log(error);
		});

		database.on('disconnected', (error) => {       //new add
			console.log("Mongo Disconnected");
			console.log(error);
		});

		database.once('connected', () => {           //new add
			console.log('Database Connected');               //new add
			console.log('Hoila! your service is running successfully !! listening on port 5000');   //new add
		})

	}catch (error){
		console.log(error);
	}
	

})

// If the Node process ends, close the Mongoose connection 
// Sigterm ?
process.on('SIGINT', function() {  
	mongoose.connection.close(function () { 
	  console.log('Mongoose default connection disconnected through app termination'); 
	  process.exit(0); 
	}); 
  }); 
  

// https://medium.com/promyze/simple-api-healthcheck-with-node-express-and-mongodb-3ae9f97f01de

// Class based
// https://webtips.fly.dev/how-to-do-health-check-for-mongojs-in-nodejs/#:~:text=Here's%20an%20example%20of%20an,MongoClient%20%3D%20require('mongodb').
app.get("/healthcheck", (req, res, next) => {
	accountDetailModel.findOne({}, function(err, obj) {
		if(err){
			res.json({"data": "Server has Mongo Issue!"});
		}else{
			if(obj != null){
				res.json({"data": "Server is running!!"});
			}
		}
	});
	
});
   

app.use('/api', routes);
app.use('/api', accountdashboard);