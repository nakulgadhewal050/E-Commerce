import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from "razorpay";
import dotenv from "dotenv";
import e from "express";
dotenv.config();


//razorpay payment integration
const currency = "INR"; 
const razorpayInstance = new razorpay({
    key_id: process.env.RZP_APIKEY,
    key_secret: process.env.RZP_APISECRET,
})


export const placeOrderRazorpay = async (req, res) => {
    try {
        const {items, amount, address} = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now(),
        
        }

        const newOrder = new Order(orderData);
        await newOrder.save();

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }
        await razorpayInstance.orders.create(options, (error, order) => {
              if (error){
                console.log("Error in creating Razorpay order:", error);
                return res.status(500).json({ message: "Error in creating Razorpay order" });
              }
              res.status(200).json(order);
        })

    } catch (error) {
        console.log("Error in placeOrderRazorpay:", error);
        return res.status(500).json({ message: "Error in placing order" });
    }
}


export const verifyRazorpay = async (req, res) => {
     try {
        const userId = req.userId;
        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt, {payment:true});
            await User.findByIdAndUpdate(userId, {cartData:{}});
            return res.status(200).json({ message: "Payment successful" })
        }
        else {
            return res.status(400).json({ message: "Payment not successful" });
        }
     } catch (error) {
        console.log("Error in verifyRazorpay:", error); 
        return res.status(500).json({ message: "Error in verifying Razorpay payment" });
     }
}


export const PlaceOrder = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId;
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod: "Cash On Delivery",
            payment: false,
            date: Date.now()
        }

        const newOrder = new Order(orderData);
        await newOrder.save();

        await User.findByIdAndUpdate(userId, { cartData: {} })

        return res.status(201).json({ message: "Order placed successfully", });

    } catch (error) {
        console.log("Error in PlaceOrder:", error);
        return res.status(500).json({ message: "Error in placing order" });
    }
}

export const userOrders = async (req, res) => {
    try {
        const userId = req.userId;
        const orders = await Order.find({ userId })
        return res.status(200).json(orders);
    } catch (error) {
        console.log("Error in userOrders:", error);
        return res.status(500).json({ message: "Error fetching user orders" });
    }
}


//for admin

export const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders);
    } catch (error) {
        console.log("Error in allOrders:", error);
        res.status(500).json({ message: "Error fetching all orders" });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status });
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        return res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
    } catch (error) {
        console.log("Error in updateOrderStatus:", error);
        return res.status(500).json({ message: "Error updating order status" });
    }
}

