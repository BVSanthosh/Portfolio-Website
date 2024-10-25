const nodemailer = require('nodemailer');

exports.sendVerificationEmail = async (userEmail, verificationToken) => {
    let transporter = nodemailer.createTransport({
       service: 'Gmail',
       auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
       },
    });
    
    const verificationUrl = `http://localhost:5000/api/v1/user/verif?token=${verificationToken}`;

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Email Verification',
        html: `<p>Please click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch(error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
}