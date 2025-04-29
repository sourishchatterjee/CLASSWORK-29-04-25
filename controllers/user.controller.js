const userModel = require('../models/userModel');
const Mailer = require('../helper/mailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class StudentController {
    register = async (req, res) => {
        try {
            const { email, name } = req.body;
    
            if (!email || !name) {
                return res.status(400).json({
                    success: false,
                    message: "Email and name are required in the request body",
                });
            }
    
            const generateRandomString = (length) => {
                const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let result = '';
                for (let i = 0; i < length; i++) {
                    result += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return result;
            };
    
            // Generate random userName and password
            const userName = generateRandomString(8);
            const password = generateRandomString(10);
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Save user to database
            const newUser = new userModel({
                userName,
                password: hashedPassword,
            });
    
            await newUser.save();
    
            // Send credentials to the provided email
            const mailer = new Mailer('Gmail', process.env.APP_EMAIL, process.env.APP_PASSWORD);
    
            const mailObj = {
                to: email, 
                subject: "Your New Account Details",
                text: `Hello ${name},\n\nYour account has been created.\n\nUsername: ${userName}\nPassword: ${password}\n\nPlease keep this information safe.\n\nThank you!`,
            };
    
            await mailer.sendMail(mailObj);
    
            res.status(200).json({
                success: true,
                message: "User created and email sent successfully",
                data: newUser
            });
    
        } catch (error) {
            console.error("Registration Error:", error);
            res.status(500).json({
                success: false,
                message: "Registration failed",
                error: error.message,
            });
        }
    };
    
    // Signin
    signin = async (req, res) => {
        try {
            const { userName, password } = req.body;
    
            
            if (!userName || !password) {
                return res.status(400).json({
                    success: false,
                    error: "Username and password are required",
                });
            }
    
            // Find user
            const user = await userModel.findOne({ userName, isDeleted: false });
    
            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid username or password",
                });
            }
    
            // Compare password
            const isPasswordValid = await bcrypt.compare(password, user.password);
    
            if (!isPasswordValid) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid username or password",
                });
            }
    
            // Create JWT token
            const payload = { id: user._id };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }); 
    
            // Save token in session (optional)
            if (req.session) {
                req.session.token = token;
            }
    
            // Attach user info to request (optional)
            req.user = user;
    
            // Send response
            res.status(200).json({
                success: true,
                message: "Signin successful",
                token,
                user: {
                    id: user._id,
                    userName: user.userName,
                }
            });
    
        } catch (err) {
            console.error("Signin Error:", err);
            res.status(500).json({
                success: false,
                message: "Signin failed",
                error: err.message,
            });
        }
    };
    

    // Get user by ID
    getUserById = async (req, res) => {
        try {
            const id = req.params.id;

            const getUser = await userModel.findOne({ _id: id, isDeleted: false });

            if (getUser) {
                res.status(200).json({
                    success: true,
                    message: "User data fetched successfully",
                    data: getUser
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Unable to fetch user data",
                });
            }

        } catch (error) {
            console.error("Get User Error:", error);
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: error.message,
            });
        }
    };

    // Update user data (only update userName or password)
    updateUserData = async (req, res) => {
        try {
            const id = req.params.id;
            const { userName, password } = req.body;

            const existingUser = await userModel.findOne({ _id: id, isDeleted: false });

            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const updatedFields = {};

            if (userName) updatedFields.userName = userName;
            if (password) {
                updatedFields.password = await bcrypt.hash(password, 10); // Always hash new password
            }

            const updatedUser = await userModel.findByIdAndUpdate(
                id,
                updatedFields,
                { new: true }
            );

            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: updatedUser,
            });

        } catch (error) {
            console.error("Update User Error:", error);
            res.status(500).json({
                success: false,
                message: "Update failed",
                error: error.message,
            });
        }
    };
}

module.exports = new StudentController();
