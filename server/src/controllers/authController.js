const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel")

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing user credentials"});
        }

        const exisitingUser = await User.findOne({ username });

        if (exisitingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: 'User sign up successful',
            data: newUser.username
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
        const {username, password} = req.body;

        if (!username || !password){
            return res.status(400).json({
                success: false,
                message: "Missing user credentials"
            });
        }

        const existingUser = await User.findOne({ username });

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

        const token = jwt.sign(
            {userId: existingUser._id, username: existingUser.username},
            process.env.SECRET_KEY || "",
            {expiresIn: "1h"}
        );

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                username: existingUser.username
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