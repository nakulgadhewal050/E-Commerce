import express from 'express';
import  isAuth  from '../middleware/isAuth.js';
import adminAuth from '../middleware/adminAuth.js';
import { allOrders, PlaceOrder, placeOrderRazorpay, updateOrderStatus, userOrders, verifyRazorpay } from '../controller/orderController.js';

const orderRoute = express.Router();

orderRoute.post('/placeorder', isAuth, PlaceOrder);
orderRoute.post('/userorder', isAuth, userOrders);

//for admin
orderRoute.post('/orderlist',adminAuth,allOrders);
orderRoute.post('/orderstatus',adminAuth, updateOrderStatus);

//for razorpay payment
orderRoute.post('/razorpay', isAuth, placeOrderRazorpay);
orderRoute.post('/verifyrazorpay', isAuth, verifyRazorpay);

export default orderRoute;