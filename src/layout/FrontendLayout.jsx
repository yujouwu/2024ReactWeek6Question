import PropTypes from 'prop-types';
import logo from '../assets/img/Strawberry cake icons created by Mihimihi - Flaticon.png';

function FrontendLayout ({basketQty}) {
  return (
    <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img src={logo} alt="strawberry cake icons" className="img-fluid me-1" width="30px" />
              Regis's
            </a>
            <div className="order-lg-1">
              <button type="button" className="btn position-relative p-1 me-3">
                <i className="bi bi-bag"></i>
                {
                  basketQty !== 0  && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {basketQty}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )
                }
              </button>
            
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Products</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About us</a>
                </li>
              </ul>
            </div>
            
          </div>
        </nav>
    </header>

    // <footer></footer>
  )
}

FrontendLayout.propTypes = {
  basketQty: PropTypes.number
}
export default FrontendLayout