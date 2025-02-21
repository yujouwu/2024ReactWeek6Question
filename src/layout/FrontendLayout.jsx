import { Outlet } from 'react-router-dom';

import Navbar from '../components/front/Navbar';
import Footer from '../components/front/Footer';
import { CartProvider } from '../store/cartStore';

function FrontendLayout () {

  return (
    <>
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