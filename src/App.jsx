// 外部 node_modules 資源
import { useState } from "react";

// 內部 src 資源
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProducts from "./pages/admin/AdminProducts";
import Products from "./pages/front/Products";


function App() {
  // 登入相關
  const [isAuth, setIsAuth] = useState(true);

  return (
    <>
      {isAuth ? <AdminProducts /> : <AdminLogin setIsAuth={setIsAuth}/>}
      {/* <Products /> */}
    </>
  );
}

export default App;
