import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import transporter from "../config/mailAuth.js";

export const allUser = (req, res) => {
    res.status(200).json({message: "List of all users"});
}


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }
        const findUser = await User.findOne({email});
        if (findUser) {
            return res.status(400).json({message: "User already exists"});
        }

        const responce = await User.create({
            name,
            email,
            password
        })
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: email,
            subject: "Welcome to our platform",
            // text: `Hello ${name},\n\nThank you for registering on our platform. We're excited to have you on board!\n\nBest regards,\nThe Team`,
            html:`<p>Hello ${name},</p>
            <p>Thank you for registering on our platform. We're excited to have you on board!</p>
            <p>Best regards,<br>The Team</p>`
        };
        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully");



        res.status(201).json({message: "User registered successfully", user: responce});
        
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

export const login = async (req, res) => {    
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({message: "Email and password are required"});
        }

        const findUser = await User.findOne({email});
        if (!findUser) {
            return res.status(401).json({message: "Invalid email or password"});
        }
        const isMatch = await findUser.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token = generateToken(findUser._id);
        res.status(200).json({message: "User logged in successfully", token});

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

export const updateProfile = async (req, res) => {
    try {
        let { name, email } = req.body;
        if(!name){
            name = req.user.name;
        }
        if(!email){
            email = req.user.email;
        }
        req.user.name = name;
        req.user.email = email;
        const updatedUser = await req.user.save();
        res.status(200).json({message: "User profile updated successfully"});
        
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

export const deleteUser = (req, res) => {
    res.status(200).json({message: "User account deleted successfully"});
}