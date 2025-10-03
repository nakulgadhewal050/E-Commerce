import express from 'express';
import isAuth from '../middleware/isAuth.js'

import {getUserCart, addToCart, UpdateCart} from '../controller/cartController.js';

const cartRoute = express.Router();

cartRoute.post('/getcart', isAuth , getUserCart);
cartRoute.post('/addcart', isAuth , addToCart);
cartRoute.post('/updatecart', isAuth , UpdateCart);




export default cartRoute;