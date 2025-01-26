// 外部 node_modules 資源
import { useState } from "react";

// 內部 src 資源
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";


function App() {
  // 登入相關
  const [isAuth, setIsAuth] = useState(false);

  return (
    <>
      {isAuth ? <ProductPage /> : <LoginPage setIsAuth={setIsAuth}/>}
    </>
  );
}

export default App;
