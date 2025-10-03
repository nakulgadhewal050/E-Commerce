import User from '../model/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { genToken, genTokenAdmin } from '../config/token.js';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        let hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(201).json({ user })

    } catch (error) {
        console.log("Error in register :", error);
        return res.status(500).json({ message: "Register error" });

    }
}


export const login = async (req, res) => {

    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid Password" });
        }

        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(201).json({ message: "Login successful" });

    } catch (error) {
        console.log("Error in login :", error);
        return res.status(500).json({ message: "Login error" });
    }
}

export const logout = async (req, res) => {
    try {
        
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });

    } catch (error) {
        res.status(500).json({ message: "Logout error" });
        console.log("Error in logout :", error);
    }
    
}

export const googleLogin = async (req, res) => {
    try {
        let {name, email} = req.body;
         let user = await User.findOne({ email });
        if (!user) {
            // Create user with a default password for Google login
            // const defaultPassword = Math.random().toString(36).slice(-8);
            // const hashedPassword = await bcrypt.hash(defaultPassword, 10);
            
            user = await User.create({
                name,
                email,
            })
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        return res.status(201).json({ message: "Login successful", user });
        
    } catch (error) {
        console.log("Error in Google login :", error);
        return res.status(500).json({ message: "Google login error" });
    }
}


export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Check admin credentials
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            console.log("Invalid admin credentials provided");
            return res.status(400).json({
                success: false,
                message: "Invalid admin credentials"
            });
        }

        // Generate admin token
        const token = genTokenAdmin(email);
        
        if (!token) {
            return res.status(500).json({
                success: false,
                message: "Failed to generate admin token"
            });
        }

        console.log("Generated admin token:", token);

        // Set cookie with proper options
        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/' // Ensure cookie is available for all paths
        });

        console.log("Admin login successful, cookie set");
        
        res.json({
            success: true,
            message: "Admin login successful",
            admin: {
                email: email,
                role: 'admin'
            }
        });

    } catch (error) {
        console.log("Error in admin login:", error);
        res.status(500).json({
            success: false,
            message: "Server error during admin login",
            error: error.message
        });
    }
};


export const adminLogout = async (req, res) => {
    try {
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        return res.status(200).json({ 
            success: true, 
            message: "Admin logout successful" 
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Admin logout error" 
        });
        console.log("Error in admin logout :", error);
    }
}

