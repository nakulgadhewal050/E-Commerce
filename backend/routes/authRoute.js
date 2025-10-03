import express from 'express';
import adminAuth from '../middleware/adminAuth.js';

const authRoute = express.Router();

import { register, login, logout, googleLogin, adminLogin,adminLogout } from '../controller/authController.js';

// Test route to verify admin authentication
const verifyAdmin = (req, res) => {
    res.json({
        success: true,
        message: "Admin authenticated successfully",
        admin: {
            email: req.adminEmail,
            role: 'admin'
        }
    });
};

authRoute.post('/signup', register);
authRoute.post('/login', login);
authRoute.get('/logout', logout);
authRoute.get('/adminlogout', adminLogout);
authRoute.post('/googlelogin', googleLogin);
authRoute.post('/adminlogin', adminLogin);
authRoute.get('/verify-admin', adminAuth, verifyAdmin);

export default authRoute;