import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login.jsx";
import Signup from "../components/Signup.jsx";
import api from "../utils/axios.js";

const Home = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

 useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await api.get("/user/me");

      // 👉 only navigate if backend confirms user is valid
      console.log(res);
      if (res.status === 200) {
        navigate("/editor");
      }
    } catch (err) {
      console.log("Not Authenticated");
    }
  };
  checkAuth();
}, []);

  return (
    <>
      {showLogin ? 
        <Login switchToSignUp={() => setShowLogin(false)}/> 
        : 
        <Signup switchToLogin={() => setShowLogin(true)}/>
      }
    </>
  );
};

export default Home;
