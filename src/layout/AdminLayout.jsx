import logo from "../assets/img/Strawberry cake icons created by Mihimihi - Flaticon.png";
import Message from "../components/Message";

function AdminLayout() {
  return (
    <>
      <Message />
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          {/* <a className="navbar-brand d-flex align-items-center" href="#"> */}
          <div className="text-white d-flex align-items-center gap-2">
            <img
              src={logo}
              alt="strawberry cake icons"
              className="img-fluid me-1"
              width="30px"
            />
            <p className="mb-0">Regis's Cakes - Admin Dashboard</p>
          </div>
          {/* </a> */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-light d-flex align-items-center gap-2"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <p className="mb-0">Sign out</p>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex" style={{minHeight: 'calc(100vh - 55px)'}}>
        <div className="bg-light" style={{ width: "200px" }}>
          <div className="list-group list-group-flush">
            <a
              href="#"
              className="list-group-item list-group-item-action active"
              aria-current="true"
            >
              <i className="bi bi-list-stars"></i>Product list
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <i className="bi bi-clipboard-check"></i>Order list
            </a>
            <a href="#" className="list-group-item list-group-item-action">
              <i className="bi bi-ticket-perforated"></i>Coupon list
            </a>
          </div>
        </div>
        <div className="bg-info w-100">產品列表</div>
      </div>
    </>
  );
}

export default AdminLayout;
