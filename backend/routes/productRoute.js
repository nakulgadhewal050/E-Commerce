import express from 'express';
import { addProduct, listProducts, removeProduct } from '../controller/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRoute = express.Router();

console.log("adminAuth value is:", adminAuth);


productRoute.post('/add', upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 }, 
    { name: "image3", maxCount: 1 }, 
    { name: "image4", maxCount: 1 }]), addProduct)

    productRoute.get("/list", listProducts);
    productRoute.post("/remove/:id",adminAuth, removeProduct);

    

    export default productRoute;