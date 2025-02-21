import PropTypes from 'prop-types';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function ProtectedAdminRoute({children}){
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const checkAdminLogin = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/api/user/check`);
      console.log(response);
      setIsAuth(true)
    } catch (error) {
      console.dir(error);
      setIsAuth(false)
      alert(error.response.data.message);
      navigate('/admin-login')
    }
  };

  // 進入頁面時，確認是否有登入
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    axios.defaults.headers.common["Authorization"] = token;
    if (!token) {
      return navigate('/admin-login')
    }
    checkAdminLogin();
  }, [navigate]);

  return (
    <>
      {
        isAuth ? children : <div>Verifying...</div>
      }
    </>
  )
}
ProtectedAdminRoute.propTypes = {
  children: PropTypes.object
}
export default ProtectedAdminRoute