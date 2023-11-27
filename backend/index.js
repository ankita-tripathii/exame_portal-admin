//Require module
const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors'); //new add
const routes = require('./routes/routes');

require('dotenv').config();   //new add

const mongoString = process.env.DATABASE_URL   //new add


// Enable CORS for all routes


// Express Initialize
const app = express();

app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true // Enable credentials (if needed)
}));

app.use(express.json());

const port = 5000; // on the server this port number should be free

app.listen(port,()=> {
	mongoose.connect(mongoString);       //new add
	const database = mongoose.connection;     //new add
	
	// Callbacks ?
	database.on('error', (error) => {       //new add
	    console.log(error)
	});

	database.once('connected', () => {           //new add
	    console.log('Database Connected');               //new add
	    console.log('Hoila! your service is running successfully !! listening on port 5000');   //new add
	})

})

app.use('/api', routes);
