const asyncHandler = require('express-async-handler');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemail = require('nodemailer');

const generateVerificationCode = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
};

const sendVerificationCode = async (email, code) => {
    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.Useremail,
            pass: process.env.UserPassOfemail,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const details = {
        from: "2019012stud@gmail.com",
        to: email,
        subject: "Verification Code for Your App",
        text: `Your verification code is: ${code}`,
    };

    try {
        await mailTransporter.sendMail(details);
        console.log("Verification code sent successfully");
    } catch (error) {
        console.error("Error sending verification code:", error.message);
    }
};


// POST /auth/Signup
// public
exports.signup = asyncHandler(async (req, res) => {
    // After creating the user, generate a token for the user
    console.log("Received dataaaaaa :", req.body);

    try {
        // Generate a 5-digit verification code
        const verificationCode = generateVerificationCode();
        console.log("Verification Code :", verificationCode);
        // Send verification code
        await sendVerificationCode(req.body.email, verificationCode);

        // Assuming you have a field 'verificationCode' in your User model
        const user = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            img: req.body.img,
            role: req.body.role || 'user',
            verificationCode: verificationCode,
        });

        // Add logic to compare the entered verification code with the one sent to the user
        if (req.body.enteredVerificationCode !== verificationCode) {
            return res.status(400).json({ success: false, msg: 'Incorrect verification code' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_Exp,
        });

        console.log("Token:", token);

        res.status(201).json({ success: true, data: user, token });
    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
});
// POST /auth/Login
// public
exports.login = asyncHandler(async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(404).json({ success: false, msg: 'Error in password or email' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_Exp,
        });

        res.status(200).json({ success: true, data: user, token });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
});

// Protect methods
exports.protect = asyncHandler(async (req, res, next) => {
    try {
        // Check if token exists in headers Authorization
        var token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
            console.log("Token:", token);
        }

        if (!token) {
            return res.status(401).json({ success: false, msg: 'You have to login first' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await UserModel.findById(decode.userId);

        if (!currentUser) {
            return res.status(401).json({ success: false, msg: 'User not found' });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        console.error("Error during token verification:", error.message);
        res.status(401).json({ success: false, msg: 'Invalid token' });
    }
});
