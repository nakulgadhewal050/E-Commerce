import {useContext, createContext, useState} from 'react'
import { AuthDataContext } from './AuthContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 


export const userDataContext = createContext();

function UserContext({children}) {
    
    let [userData, setUserData] = useState("");

    let {serverUrl} = useContext(AuthDataContext)

    let navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
                withCredentials: true
            });

            setUserData(result.data);
            console.log("User data fetched successfully:", result.data);
        } catch (error) {
          
            setUserData(null);
            console.log("Error in getCurrentUser (clearing user data):", error);
        }
     }

     useEffect(() => {
        getCurrentUser();
        
     },[])


    let value = {
          userData, setUserData, getCurrentUser
    }

  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext
