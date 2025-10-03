import express from 'express';


const authRoute = express.Router();

import { register, login, logout, googleLogin, adminLogin,adminLogout } from '../controller/authController.js';



authRoute.post('/signup', register);
authRoute.post('/login', login);
authRoute.get('/logout', logout);
authRoute.get('/adminlogout', adminLogout);
authRoute.post('/googlelogin', googleLogin);
authRoute.post('/adminlogin', adminLogin);




export default authRoute;