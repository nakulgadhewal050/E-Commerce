import express from 'express';
const app = express();
const port = process.env.PORT || 4000;

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import cartRoute from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:['https://e-commerce-frontend-mee4.onrender.com','https://e-commerce-admin-8byx.onrender.com'],
    credentials: true,

}))


app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/product',productRoute);
app.use('/api/cart',cartRoute);
app.use('/api/order', orderRoute);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
})

