/*
    Contains the controllers for authentication (login and signup)
*/

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel')  //imports the user model
//const { sendVerificationEmail } = require('../utils/emailSender');  //imports the function to send the verification email

//signup controller which contains the logic for handling signup requests and saves the user signup details as a document in the User model
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing user credentials'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            verified: false
        });

        await newUser.save();

        //const verificationToken = jwt.sign({userId: newUser._id}, process.env.SECRET_KEY, {expireIn: '1h'});
    
        //await sendVerificationEmail(email, verificationToken);

        return res.status(201).json({
            success: true,
            message: 'User sign up successful, please verify your email',
            data: {
                firstName: newUser.firstName,
                lastName: newUser.lastName
            }
        });

    } catch(error) {
        console.error(`Error creating new user: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while signing up'
        });
    }
}

//login controller which contains the logic for handling login requests
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Missing user credentials'
            });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser){
            return res.status(401).json({
                success: false,
                message: 'Invalid usernamd or password'
            })
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch){
            return res.status(401).json({
                success: false,
                message: 'Invalid username or password'
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
            process.env.SECRET_KEY,
            {expiresIn: '1h'}
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 3600000
        });

        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email
            }
        });

    } catch(error) {
        console.error(`Error creating new user: ${error}`);
        return res.status(500).json({
            success: false,
            message: 'An unexpected error occurred while logging in'
        });
    }
}

exports.verifyEmail = async (req, res) => {
    const verificationToken = req.param.token;

    if (!verificationToken) {
        return res.status(400).json({
            success: false,
            message: 'Verification token missing'
        });
    }

    try {
        const decoded = jwt.verify(verificationToken, process.env.SECRET_KEY);
        const userId = decoded.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        if (!user.verified) {
            user.verified = true;
            await user.save();

            return res.status(200).json({
                success: true,
                message: 'Email verification successful, you can now log in.'
            });
        } else {
            return res.status(400).json({
                success: true,
                message: 'This email has already been verified. You can log in now.'
            });
        }
    } catch(error) {
        console.error(`Error verifiying email: ${error}`);
        res.status(400).send('Invalid or expired verification token.');
    }
}