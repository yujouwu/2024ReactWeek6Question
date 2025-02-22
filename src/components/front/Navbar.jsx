import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import logo from '../../assets/img/Strawberry cake icons created by Mihimihi - Flaticon.png';
import { CartContext } from '../../contexts/cartContext';

function Navbar(){
  const { basketQty } = useContext(CartContext);
  const routes = [
    {
      path: '/products',
      name: 'Products'
    },
    {
      path: '/about',
      name: 'About'
    },
    {
      path: '/admin-login',
      name: 'Admin'
    },
  ]

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand d-flex align-items-center" to='/'>
            <img src={logo} alt="strawberry cake icons" className="img-fluid me-1" width="30px" />
            Regis's
          </NavLink>
          <div className="order-lg-1">
            <NavLink to='/cart' className="position-relative p-1 me-3">
              <i className="bi bi-bag"></i>
              {
                basketQty !== 0  && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {basketQty}
                  </span>
                )
              }
            </NavLink>
          
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {
                routes.map((route) => (
                  <li key={route.path} className="nav-item">
                    <NavLink className="nav-link active" aria-current="page" to={route.path}>{route.name}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
export default Navbar