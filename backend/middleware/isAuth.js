import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        let {token} = req.cookies;

        if(!token){
            return res.status(401).json({message: "Unauthorized access"});
           
        }

        let verifyToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!verifyToken){
            return res.status(401).json({message: "Unauthorized access"}); 
        }

        req.userId = verifyToken.userId;
        next();

    } catch (error) {
        console.log("isAuth middleware error:", error);
        res.status(500).json({message: "isAuth error", error: error.message});
    }
}

export default isAuth;