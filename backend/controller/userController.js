import User from '../model/userModel.js';


export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "current user error", error: error.message });
    }
}
 

export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;

         
        if (!adminEmail){
            return res.status(401).json({ message: "Admin not found " });
        }

        return res.status(200).json({ 
            email: adminEmail,
            role: "admin"

         });

    } catch (error) {
        return res.status(500).json({ message: "Admin fetch error", error: error.message });
    }
}