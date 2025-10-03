import { createContext, useContext, useEffect, useState } from 'react'
import { AuthDataContext } from './AuthContext'
import axios from 'axios'
import { userDataContext } from './UserContext'
import {toast} from 'react-toastify';

export const shopDataContext = createContext()

function ShopContext({ children }) {

    let [products, setProducts] = useState([])
    let { serverUrl } = useContext(AuthDataContext)
    let currency = "₹";
    let delivery_fee = 40;
    let [search, setSearch] = useState("");
    let [showSearch, setShowSearch] = useState(false);
    let [cartItem, setCartItem] = useState({});
    let { userData } = useContext(userDataContext)


    const getProducts = async (req, res) => {
        try {
            const result = await axios.get(serverUrl + '/api/product/list')

            setProducts(result.data)
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    }

    const addtoCart = async (itemId, size) => {

        if (!size) {
            alert("Please select a size");
            return;
        }

        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        
        setCartItem(cartData);
        toast.success("Item added to cart!");

        if (userData) {
            try {
                let result = await axios.post(serverUrl + '/api/cart/addcart', { itemId, size },
                    { withCredentials: true })
                console.log("result from add to cart:", result.data);

            } catch (error) {
                console.log("Error adding to cart:", error);
            }
        }
    }

    const getUserCart = async () => {
        try {
            const result = await axios.post(serverUrl + '/api/cart/getcart', {},
                { withCredentials: true })
            setCartItem(result.data.cartData);

        } catch (error) {
            console.log("Error fetching cart data:", error);
        }
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if (userData) {
            try {
                await axios.post(serverUrl + '/api/cart/updatecart', { itemId, size, quantity },
                    { withCredentials: true });
                console.log("Cart updated successfully");

            } catch (error) {
                console.log("Error updating cart:", error);

            }
        }
    }


    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item]
                    }
                } catch (error) {
                    console.log("error in getCartCount:", error);
                }
            }
        }

        return totalCount;
    }

   const getCartAmmount = () => {
  let total = 0;
  for (const productId in cartItem) {
    for (const size in cartItem[productId]) {
      const product = products.find(p => p._id === productId);
      if (product) {
        total += product.price * cartItem[productId][size];
      }
    }
  }
  return total;
};


    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        getUserCart()
    }, [])



    let value = {
        products, currency, delivery_fee, getProducts, search, setSearch, showSearch,
        setShowSearch, cartItem, addtoCart, getCartCount, setCartItem, updateQuantity, getUserCart, getCartAmmount
    }


    return (
        <div>
            <shopDataContext.Provider value={value}>
                {children}
            </shopDataContext.Provider>
        </div>
    )
}

export default ShopContext
