import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
export const AppContext = createContext();

const AppContextProvider = ( props ) => {

    const [user,setUser]= useState(null);
    const[showLogin,setShowLogin] = useState(false);
    const [token,setToken] = useState(localStorage.getItem('token'));
    const [credit,setCredit] = useState(false);
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
const loadCreditsData = async () => {
    try {
        const { data } = await axios.get(
            backendUrl + '/api/user/credits',
            {
                headers: {
                    token: token
                }
            }
        );

        if (data.success) {
            setCredit(data.credits);
            setUser(data.user);
           
        } else {
            toast.error(data.message + '😢');
        }

    } catch (error) {
        console.log(error);
        toast.error(error.message + '😢');
    }
};

const generateImage = async (prompt) => {
    try {
        const { data } = await axios.post(
            backendUrl + '/api/image/generate-image',{ prompt },
            {headers: {token: token}});

        if (data.success) {
            loadCreditsData();
            toast.success('Image Generated Successfully!😊');
            return data.image;// Return the generated image URL
        }
        else {
            toast.error(data.message + '😢');
            loadCreditsData();
            if(data.creditBalance === 0){
                 navigate('/buy');
                // toast.error('You have no credits left. Please purchase more credits to generate images.');
            }
        }

    } catch (error) {
        toast.error(error.message + '😢');
    }
};

    
    
    
    //Logout 
    const logout = () => {
       
        localStorage.removeItem('token');
        setUser(null);
        setToken('');
        toast.success('Logout Successfully!😊');
    }
    

    useEffect(() => {
        if (token) {
            loadCreditsData();
        }
    }, [token]);

     useEffect(() => {
       if (credit) {
        
       }
    }, [credit]);
    const value = {
        user,setUser,showLogin,setShowLogin, backendUrl,token,setToken, credit,setCredit, loadCreditsData, logout, generateImage
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

    
}
export default AppContextProvider;