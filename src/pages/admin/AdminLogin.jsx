// 外部 node_modules 資源
import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

// 內部 src 資源
import Footer from "../../components/Footer";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;


function AdminLogin({setIsAuth}){
  const [account, setAccount] = useState({
    username: "example@test.com",
    password: "example",
  });

  const handleAdminSignInInputChange = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/admin/signin`, account);
      const { expired, token } = response.data;
      setIsAuth(true);
      document.cookie = `hexToken=${token}; expires=${new Date(
        expired
      )}; SameSite=None; Secure`;
      axios.defaults.headers.common["Authorization"] = `${token}`;
      // getProducts();
    } catch (error) {
      console.dir(error);
      alert(`登入失敗: ${error.response.data.error.message}`);
    }
  };

  const checkAdminLogin = async () => {
    try {
      await axios.post(`${BASE_URL}/api/user/check`);
      // getProducts();
      setIsAuth(true);
    } catch (error) {
      console.dir(error);
      alert(error.response.data.message);
    }
  };

  // 進入頁面時，確認是否有登入
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    axios.defaults.headers.common["Authorization"] = token;

    checkAdminLogin();
  }, []);

  return (
    <>
    <div className="vh-100 d-flex flex-column justify-content-center">
      <div className="d-flex flex-column align-items-center mt-auto">
        <h1 className="mb-5">
          請先登入 <i className="bi bi-box-arrow-in-left"></i>
        </h1>
        <form onSubmit={handleAdminLogin} className="d-flex flex-column gap-3">
          <div className="form-floating mb-3">
            <input
              name="username"
              value={account.username}
              onChange={handleAdminSignInInputChange}
              type="email"
              className="form-control"
              id="username"
              placeholder="name@example.com"
            />
            <label htmlFor="username">Email address</label>
          </div>
          <div className="form-floating">
            <input
              name="password"
              value={account.password}
              onChange={handleAdminSignInInputChange}
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn btn-primary">
            登入
          </button>
        </form>
      </div>
      <Footer />
    </div>
    </>
  )
}
AdminLogin.propTypes = {
  setIsAuth: PropTypes.func.isRequired
}
export default AdminLogin