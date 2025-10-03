import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {

    try {
        // Try to get token from cookies first, then from Authorization header
        let token = req.cookies.adminToken;
        
        // If no cookie token, try Authorization header
        if (!token && req.headers.authorization) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }

        console.log("AdminAuth: Cookie token:", req.cookies.adminToken ? "Found" : "Not found");
        console.log("AdminAuth: Authorization header:", req.headers.authorization ? "Found" : "Not found");
        console.log("AdminAuth: Final token:", token ? "Found" : "Not found");
        
        if (!token) {
            console.log("AdminAuth: No token found in cookies or headers");
            return res.status(401).json({ 
                success: false,
                message: "Not authorized access login again" 
            });
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("AdminAuth: Token verified, email:", verifyToken.email);

        if (!verifyToken) {
            console.log("AdminAuth: Invalid token");
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized access" 
            });
        }

        // Check if email matches admin email
        if (verifyToken.email !== process.env.ADMIN_EMAIL) {
            console.log("AdminAuth: Email mismatch. Token email:", verifyToken.email, "Expected:", process.env.ADMIN_EMAIL);
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