import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {

    try {
        const token = req.cookies.adminToken;

        
        if (!token) {
            console.log("AdminAuth: No token found");
            return res.status(401).json({ 
                success: false,
                message: "Not authorized access login again" 
            });
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
      

        if (!verifyToken) {
            console.log("AdminAuth: Invalid token");
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized access" 
            });
        }

        // Check if email matches admin email
        if (verifyToken.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ 
                success: false,
                message: "Access denied - Invalid admin" 
            });
        }

        req.adminEmail = verifyToken.email;
      
        console.log("AdminAuth: Admin authenticated successfully");
        
  
        next();
        

    } catch (error) {
        console.log("Error in admin auth middleware:", error);
        return res.status(401).json({ 
            success: false,
            message: "Authentication failed",
            error: error.message 
        });
    }
}

export default adminAuth;