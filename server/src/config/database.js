/**
 * Main database file for managing access to the database
 */

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

const envPath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });   //reads the .env variables

//establishes a connection with the database using the URL stored in .env
exports.connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connected: ${con.connection.host}`);
  } catch(error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
}