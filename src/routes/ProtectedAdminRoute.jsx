import PropTypes from 'prop-types';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingScreenContext } from '../contexts/loadingScreenContext';
import LoadingScreen from '../components/LoadingScreen';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function ProtectedAdminRoute({children}){
  const { isLoadingScreen, setIsLoadingScreen } = useContext(LoadingScreenContext);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  const checkAdminLogin = async () => {
    setIsLoadingScreen(true)
    try {
      const response = await axios.post(`${BASE_URL}/api/user/check`);
      console.log(response);
      setIsAuth(true)
    } catch (error) {
      console.dir(error);
      setIsAuth(false)
      alert(error.response.data.message);
      navigate('/admin-login')
    } finally {
      setIsLoadingScreen(false)
    }
  };

  // 進入頁面時，確認是否有登入
  useEffect(() => {
    console.log('test');
    
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
        isAuth ? children : <LoadingScreen isLoadingScreen={isLoadingScreen} />
      }
      {/* {children} */}
    </>
  )
}
ProtectedAdminRoute.propTypes = {
  children: PropTypes.object
}
export default ProtectedAdminRoute