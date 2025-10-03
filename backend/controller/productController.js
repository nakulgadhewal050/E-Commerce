import uploadOnCloudinary from "../config/cloudinary.js";
import Product from "../model/productModel.js";


export const addProduct = async (req, res) => {
      try {
        let { name, price, description, category, bestSeller, sizes, subCategory } = req.body;

        let image1 = req.files.image1 ? await uploadOnCloudinary(req.files.image1[0].path) : null;
        let image2 = req.files.image2 ? await uploadOnCloudinary(req.files.image2[0].path) : null;
        let image3 = req.files.image3 ? await uploadOnCloudinary(req.files.image3[0].path) : null;
        let image4 = req.files.image4 ? await uploadOnCloudinary(req.files.image4[0].path) : null;


        let productData = { 
            name, 
            price: Number(price), 
            description, 
            category, 
            bestSeller: bestSeller === 'true' ? true : false, 
            sizes: JSON.parse(sizes), 
            subCategory , 
            date: Date.now(), 
            image1, 
            image2, 
            image3, 
            image4 
        };

        const product = await Product.create(productData);

        return res.status(201).json({ product });


      } catch (error) {
        console.log("Error in addProduct:", error);
        return res.status(500).json({ message: "Error in adding product" });
      }
}

export const listProducts = async (req, res) => {
   try {
         let product = await Product.find({});
         return res.status(200).json( product );
   } catch (error) {

       console.log("Error in fetching products:", error);
       return res.status(500).json({ message: "Error in fetching products" });
   }
}

export const removeProduct = async (req, res) => {
  try {
    let { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product removed successfully", product });

  } catch (error) {
     console.log("Error in remove products:", error);
     return res.status(500).json({ message: "Error in fetching products" });
  }
}