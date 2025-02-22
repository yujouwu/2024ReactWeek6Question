import { Outlet } from 'react-router-dom';

import Navbar from '../components/front/Navbar';
import Footer from '../components/front/Footer';
import { CartProvider } from '../contexts/cartContext';
import { useContext } from 'react';
import { LoadingScreenContext } from '../contexts/loadingScreenContext';
import LoadingScreen from '../components/LoadingScreen';

function FrontendLayout () {
  const { isLoadingScreen } = useContext(LoadingScreenContext);

  return (
    <>
      <LoadingScreen isLoadingScreen={isLoadingScreen} />
      <CartProvider>
        <Navbar /> 
        <main>
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </>
  )
}
export default FrontendLayout