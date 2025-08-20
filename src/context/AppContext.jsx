import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [credit, setCredit] = useState(0);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Fetch user and credit info
  const loadCreditsData = async () => {
    if (!token) return null;

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token }
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
        return data.credits; // Return updated credit value
      } else {
        toast.error(data.message + ' 😢');
        return null;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message + ' 😢');
      return null;
    }
  };

  // Update token and refetch data immediately
  const updateToken = async (newToken) => {
    setToken(newToken);
    await loadCreditsData(); // Fetch latest credits and user info immediately
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setToken('');
    setUser(null);
    setCredit(0);
    toast.success('Logout Successfully! 😊');
    navigate('/');
  };

  // Generate image function with reactive credit update
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      );

      if (data.success) {
        const updatedCredits = await loadCreditsData(); // Update credits immediately
        toast.success('Image Generated Successfully! 😊');
        return { image: data.image, credit: updatedCredits }; // Return image and updated credit
      } else {
        toast.error(data.message + ' 😢');
        const updatedCredits = await loadCreditsData();
        if (updatedCredits === 0) {
          navigate('/buy');
        }
        return { image: null, credit: updatedCredits };
      }
    } catch (error) {
      toast.error(error.message + ' 😢');
      return { image: null, credit };
    }
  };

  // Initial load of credits and user info if token exists
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    updateToken,
    logout,
    generateImage
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
