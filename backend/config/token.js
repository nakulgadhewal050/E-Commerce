import jwt from 'jsonwebtoken';

export const genToken = (userId) => {
    try {
        let token = jwt.sign({ 
            userId, 
            type: 'user' 
        }, process.env.JWT_SECRET, { 
            expiresIn: '7d' 
        });
        return token;
    } catch (error) {
        console.error("Error generating user token:", error);
        return null;
    }
}

export const genTokenAdmin = (email) => {
    try {
        let token = jwt.sign({ 
            email, 
            role: 'admin',
            type: 'admin'
        }, process.env.JWT_SECRET, { 
            expiresIn: '1d' 
        });
        return token;
        
    } catch (error) {
        console.error("Error generating admin token:", error);
        return null;
    }
}