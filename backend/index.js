//Require module
const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors'); //new add
const routes = require('./routes/routes');
const accountdashboard = require('./routes/accountdashboard');

require('dotenv').config();   //new add

const mongoString = process.env.DATABASE_URL   //new add


// Enable CORS for all routes


// Express Initialize
const app = express();

app.use(express.json());

app.use(cors());
app.use(cors({
    origin: 'http://localhost:5001', // Replace with your frontend URL
    credentials: true // Enable credentials (if needed)
}));



const port = 5000; // on the server this port number should be free

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