import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {

     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_APIKEY, 
        api_secret: process.env.CLOUDINARY_APISECRET,
    });

    try {
         if(!filePath){
        return null
    }

    const uploadResult = await cloudinary.uploader.upload(filePath)
    fs.unlinkSync(filePath); // Delete the file after upload
    return uploadResult.secure_url; // Return the URL of the uploaded image
    } 
    catch (error) {
        fs.unlinkSync(filePath);
        console.log(eror)
    }
}

export default uploadOnCloudinary;