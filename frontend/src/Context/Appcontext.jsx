import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export const Appcontext = createContext();

const AppContextProvider = (props) => {
  const [user, setuser] = useState(false);
  const [showLogin, setshowLogin] = useState(false);
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [credit, setcredit] = useState(false);

  const navigate = useNavigate();

  const loadCreaditsData = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/credits");
      if (data.success) {
        setcredit(data.credits);
        setuser(data.user);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const generateimg = async (prompt) => {
    try {
      const { data } = await axiosInstance.post("/api/image/generateimg", { prompt });

      if (data.success) {
        loadCreaditsData();
        return data.image;
      } else {
        toast.error(data.message);
        loadCreaditsData();
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    settoken(null);
    setuser(null);
  };

  useEffect(() => {
    if (token) {
      loadCreaditsData();
    }
  }, [token]);

  const value = {
    user,
    setuser,
    showLogin,
    setshowLogin,
    backendurl: import.meta.env.VITE_API_URL,
    token,
    settoken,
    credit,
    setcredit,
    loadCreaditsData,
    logOut,
    generateimg,
  };

  return (
    <Appcontext.Provider value={value}>
      {props.children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
