
import express from 'express';
import isAuth from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';
import { getCurrentUser, getAdmin } from '../controller/userController.js';

const userRoute = express.Router();

userRoute.get("/getcurrentuser", isAuth,getCurrentUser);
userRoute.get("/getadmin", adminAuth,getAdmin);


export default userRoute;