const dotenv = require('dotenv');
const express = require('express');

const { connectDB } = require('./src/config/database');
const authRouter = require('./src/routes/authRoute');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use('/api/v1/user', authRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Project-0925");
})

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})