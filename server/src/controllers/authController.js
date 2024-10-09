const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel")

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing user credentials"});
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"});
        }

        console.log("test");
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User sign up successful',
            data: {
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        });

    } catch(error) {
        console.error(`Error creating new user: ${error}`);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred"
        });
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Missing user credentials"
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser){
            return res.status(401).json({
                success: false,
                message: "Invalid usernamd or password"
            })
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        const payload = {
            id: existingUser._id,               
            firstName: existingUser.firstName, 
            lastName: existingUser.lastName,   
            email: existingUser.email
        };

        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY || "1234!@#%<{*&)",
            {expiresIn: "1h"}
        );

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email
            },
            token: token
        });

    } catch(error) {
        console.error(`Error creating new user: ${error}`);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred"
        });
    }
}