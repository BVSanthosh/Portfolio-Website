/*
 *   Main server file which acts as the entry point for all incoming client requests.
*/
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const { connectDB } = require('./src/config/database');
const authRouter = require('./src/routes/authRoute');  //imports the authentication routes
const formRouter = require('./src/routes/formRoute');  //imports the form route
const app = express();

app.use(cookieParser());  //middleware that makes parsing cookies easier

app.use(cors({    //enables Cross-Origin Resource Sharing
    origin: 'http://localhost:3000',
    credentials: true,
}));  

dotenv.config();  //reads the environment variables stored in .env

const PORT = process.env.PORT || 5000;  //port where the server listens for requests

connectDB();  //conencts to the MongoDB database

app.use(express.json());  //uses a default middleware which parses JSON data from incoming requests

app.use('/api/v1/user', authRouter);  //sets up the authentication routes (signup and login)
app.use('/api/v1/user', formRouter)   //sets up the form route

app.get("/", (req, res) => {  //root route
    res.send("Welcome to Project-0925");
})

app.listen(PORT, () => {  //initiates the server
    console.log(`server running on port: ${PORT}`);
})