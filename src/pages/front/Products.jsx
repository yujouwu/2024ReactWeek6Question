// 外部 node_modules 資源
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useForm } from 'react-hook-form';
import ReactLoading from 'react-loading';


// 內部 src 資源
import Pagination from "../../components/Pagination";
// import ProductModal from "../../components/ProductModal";
import FrontendLayout from "../../layout/FrontendLayout";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function Products() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Pagination
  const [pagination, setPagination] = useState({});

  // 取得產品列表
  const getProducts = async (page = 1) => {
    setIsScreenLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/${API_PATH}/products?page=${page}`
      );
      console.log(response);
      setProducts(response.data.products);
      setPagination(response.data.pagination)
    } catch (error) {
      console.dir(error);
    } finally{
      setIsScreenLoading(false);
    }
  };

  // Modal 相關
  const productModalRef = useRef(null);

  const openModal = () => {
    productModalRef.current.show();
    setCartQuantity(1);
  };

  const closeModal = () => {
    productModalRef.current.hide();
  };

  useEffect(() => {
    // 建立 Modal 實體
    productModalRef.current = new Modal("#productModal");
  }, []);

  const handleSeeMore = (e, product) => {
    e.preventDefault();
    setProduct(product);
    openModal();
  };

  // Modal 內照片
  const [mainImage, setMainImage] = useState(null);
  useEffect(() => {
    if (product) {
      setMainImage(product.imageUrl); // 當 product 更新後執行
      // setCartQuantity(1);
    }
  }, [product]);

  // 加入購物車
  const [cartQuantity, setCartQuantity] = useState(1);

  const addCart = async(productId, qty) => {
    setIsLoading(true)
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const data = {
        "data": {
          "product_id": productId,
          "qty": qty
        }
      }
      const response = await axios.post(url, data);
      console.log(response);
      alert(response.data.message);
      getCart();
      closeModal();
    } catch (error) {
      console.dir(error);
      alert(`加入購物車失敗：${error.response.data.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // 取得購物車列表
  const [cart, setCart] = useState([]);
  const [basketQty, setBasketQty] = useState(0);

  const getCart = async() => {
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const response = await axios.get(url);
      console.log('getCart:', response);
      const cartData = response.data.data;
      setCart(cartData);
      setBasketQty(cartData.carts?.reduce((sum, cart) => sum + cart.qty, 0));
    } catch (error) {
      console.dir(error);
    }
  }

  // 更新商品數量
  const updateCart = async(cartId, productId, qty) => {
    setIsScreenLoading(true);
    try {
      qty = Number(qty);
      if (isNaN(qty) || qty < 1) qty = 1;
      const url = `${BASE_URL}/api/${API_PATH}/cart/${cartId}`;
      const data = {
        "data": {
          "product_id": productId,
          "qty": qty
        }
      }
      await axios.put(url, data);
      getCart();
    } catch (error) {
      console.dir(error);
      alert(`更新購物車失敗：${error.response.data.message}`);
    } finally{
      setIsScreenLoading(false);
    }
  }

  // 刪除購物車 (全部)
  const deleteCartAll = async() => {
    setIsScreenLoading(true);
    try {
      const url = `${BASE_URL}/api/${API_PATH}/carts`;
      const response = await axios.delete(url);
      console.log(response);
      alert(response.data.message);
      getCart();
    } catch (error) {
      console.dire(error);
      alert(`清空購物車失敗：${error.response.data.message}`)
    } finally{
      setIsScreenLoading(false);
    }
  }

  // 刪除購物車 (單一)
  const deleteCartOne = async(cartId) => {
    setIsScreenLoading(true);
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart/${cartId}`;
      const response = await axios.delete(url);
      console.log(response);
      alert(response.data.message);
      getCart();
    } catch (error) {
      console.dire(error);
      alert(`移除產品車失敗：${error.response.data.message}`)
    } finally{
      setIsScreenLoading(false);
    }
  }

  // React hook form
  const {
    register, // state
    handleSubmit,
    formState: {errors},
    reset
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const {message, ...user} = data;
    const userInfo = {
      "data": {
        user,
        message
      }
    }
    checkout(userInfo);
  })

  // 客戶購物 - 結帳
  const checkout = async(data) => {
    setIsScreenLoading(true);
    try {
      const url = `${BASE_URL}/api/${API_PATH}/order`;
      const response = await axios.post(url, data);
      alert(response.data.message);
      getCart();
      reset();
    } catch (error) {
      console.dir(error);
      alert(error.response.data.message)
    } finally{
      setIsScreenLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
    getCart();
  }, []);

  return (
    <>
      <FrontendLayout basketQty={basketQty}/>
      {/* product list */}
      <div className="container">
        <h1 className="text-center">All Products</h1>
        <div className="row row-cols-2 row-cols-lg-4 g-3 g-md-4 g-lg-5">
          {products.map((product) => (
            <div key={product.id} className="col">
              <div className="d-flex flex-column align-items-center h-100">
                <a href="#" onClick={(e) => handleSeeMore(e, product)}>
                  <img
                    src={product.imageUrl}
                    className="w-100"
                    alt={product.title}
                  />
                  <div className="text-center">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">
                      £{product.price} /{" "}
                      <del className="text-secondary">
                        {product.origin_price}
                      </del>
                    </p>
                  </div>
                </a>
                <button
                  type="button"
                  className="btn btn-primary w-100 mt-auto rounded-pill"
                  onClick={() => addCart(product.id, 1)}
                  disabled={isLoading}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <Pagination pagination={pagination} getProducts={getProducts}/>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="productModal"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="productModalLabel">
                {product.title}
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <section>
                <div>
                  <img
                    src={mainImage || product.imageUrl}
                    className="card-img-top object-fit-contain main-image"
                    alt="main image"
                  />
                </div>
                <div className="d-flex flex-wrap gap-3">
                  <img
                    className={`more-images ${
                      mainImage === product.imageUrl ? "active" : ""
                    }`}
                    src={product.imageUrl}
                    onClick={() => setMainImage(product.imageUrl)}
                  />
                  {product.imagesUrl?.map((url, index) => (
                    <img
                      className={`more-images ${
                        mainImage === url ? "active" : ""
                      }`}
                      key={index}
                      src={url}
                      alt="more image"
                      onClick={() => setMainImage(url)}
                    />
                  ))}
                </div>
              </section>
              <section>
                <h5 className=" d-flex align-items-center">
                  {product.title}
                  <span className="badge text-bg-primary ms-2">
                    {product.category}
                  </span>
                </h5>
                <p className="mb-0">
                  £{product.price} /{" "}
                  <del className="text-secondary">
                    {product.origin_price}{" "}
                  </del>
                </p>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex">
                    <button
                      type="button"
                      className="btn border rounded-circle"
                      aria-label="Decrease quantity"
                      disabled={cartQuantity === 1}
                      onClick={() =>
                        setCartQuantity((prev) => Math.max(1, prev - 1))
                      }
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      type="number"
                      value={cartQuantity}
                      className="text-center border-0 border-bottom"
                      min="1"
                      max="10"
                      onChange={(e) => {
                        let num = Number(e.target.value);
                        if (isNaN(num)) num = 1; // 防止 NaN
                        num = Math.max(1, Math.min(10, num)); // 限制範圍在 1 到 10 之間
                        setCartQuantity(num);
                      }}
                    />
                    <button
                      type="button"
                      className="btn border rounded-circle"
                      aria-label="Increase quantity"
                      disabled={cartQuantity === 10}
                      onClick={() =>
                        setCartQuantity((prev) => Math.min(10, prev + 1))
                      }
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => addCart(product.id, cartQuantity)}
                    disabled={isLoading}
                  >
                    Add to Bag
                  </button>
                </div>
              </section>
              <section>
                <p className="">
                  商品描述：
                  <br />
                  {product.description}
                </p>
                <p className="">Allergens：{product.allergens}</p>
                <p className="">Ingredient：{product.ingredients}</p>
              </section>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Per 100g</th>
                  </tr>
                </thead>
                <tbody>
                  {product.nutritionalInfo?.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* cart */}
      <div className="container">
        {
          cart.carts?.length > 0 ? (
            <div className="row">
              <div className="col-lg-9">
                <div className="d-flex align-items-center gap-3 border-bottom py-3">
                  <p className="h4 mb-0">
                    Basket <span>({basketQty} {basketQty === 1 ? 'item' : 'items'})</span>
                    
                  </p>
                  <div>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={deleteCartAll}
                    >
                      清空購物車
                    </button>
                  </div>
                </div>
                {cart?.carts?.map((cartItem) => (
                  <div key={cartItem.id} className="d-flex border-bottom py-3 gap-3">
                    <div className="w-25">
                      <img
                        src={cartItem.product.imageUrl}
                        alt={cartItem.product.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="w-75 d-flex flex-column">
                      <div className="d-flex flex-column flex-lg-row flex--wrap align-items-start align-items-lg-center">
                        <div className="flex-fill">
                          <p className="mb-0">{cartItem.product.title}</p>
                        </div>
                        <div className="order-lg-1 w-15 text-lg-end">
                          <p className="mb-0">£{cartItem.final_total}</p>
                        </div>
                        <div>
                          <div className="d-flex align-items-center flex-wrap">
                            <span>數量：</span>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="btn border rounded-circle"
                                aria-label="Decrease quantity"
                                disabled={cartItem.qty === 1}
                                onClick={() =>
                                  updateCart(
                                    cartItem.id,
                                    cartItem.product_id,
                                    cartItem.qty - 1
                                  )
                                }
                              >
                                <i className="bi bi-dash"></i>
                              </button>
                              <input
                                type="number"
                                value={cartItem.qty}
                                className="text-center border-0 border-bottom"
                                min="1"
                                max="999"
                                onChange={(e) => {
                                  updateCart(
                                    cartItem.id,
                                    cartItem.product_id,
                                    e.target.value
                                  );
                                }}
                              />
                              <button
                                type="button"
                                className="btn border rounded-circle"
                                aria-label="Increase quantity"
                                onClick={() =>
                                  updateCart(
                                    cartItem.id,
                                    cartItem.product_id,
                                    Math.min(10, cartItem.qty + 1)
                                  )
                                }
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                      </div>
                      <div className="mt-auto">
                          <button
                            type="button"
                            className="btn border-0 ps-0"
                            onClick={() => deleteCartOne(cartItem.id)}
                          >
                            <i className="bi bi-trash me-2"></i>
                            <span>Remove</span>
                          </button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-3">
                <p className="h4">Order Summary</p>
                <div className="border p-3">
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-0">
                        Subtotal <span>({basketQty} {basketQty === 1 ? 'item' : 'items'})</span>
                      </p>
                      <span>£{cart?.final_total}</span>
                    </div>
                    <p>Delivery fee</p>
                  </div>
                  <div className="border-top py-3">
                    <p className="h4 d-flex align-items-center justify-content-between">Total <span>£{cart?.final_total}</span></p>
                    
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="h4 mb-0">Your basket is empty.</p>
            </div>
          )
        }
        

      </div>

      {/* order form */}
      <div className="container">
        <p className="h4">Checkout</p>
        <p className="h5">Add delivery information</p>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              {...register('name', {
                required: 'Name is required'
              }) }
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              id="name"
              aria-describedby="name"
            />
            {
              errors.name && (<div className="invalid-feedback">{errors?.name?.message}</div>)
            }
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format'
                }
              })}
              type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email"
            />
            {
              errors.email && (<div className="invalid-feedback">{errors?.email?.message}</div>)
            }
          </div>
          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              Phone Number
            </label>
            <input
              {...register('tel', {
                required: 'Phone Number is required',
                pattern: {
                  value: /^(0[2-8]\d{7}|09\d{8})$/,
                  message: 'Invalid phone number format'
                }
              })}
              type="tel" className={`form-control ${errors.tel ? 'is-invalid' : ''}`} id="tel" 
            />
            {
              errors.tel && (<div className="invalid-feedback">{errors?.tel?.message}</div>)
            }
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              {...register('address', {
                required: 'Address is required'
              })}
              type="text" className={`form-control ${errors.address ? 'is-invalid' : ''}`} id="address" 
            />
            {
              errors.address && (<div className="invalid-feedback">{errors?.address?.message}</div>)
            }
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              {...register('message')}
              type="text" className={`form-control ${errors.message ? 'is-invalid' : ''}`} id="message" 
            />
            {
              errors.message && (<div className="invalid-feedback">{errors?.message?.message}</div>)
            }
          </div>
          <div className="mb-3 form-check">
            <input
              {...register('isCheckForm', {
                required: 'Please check the box to agree to the Terms and Conditions.'
              })}
              type="checkbox"
              className={`form-check-input ${errors.isCheckForm ? 'is-invalid' : ''}`}
              id="isCheckForm"
            />
            <label className="form-check-label" htmlFor="isCheckForm">
              Check me out
            </label>
            {
              errors.isCheckForm && (<div className="invalid-feedback">{errors?.isCheckForm?.message}</div>)
            }
          </div>
          <button type="submit" className="btn btn-primary" disabled={cart.carts?.length < 1}>
            Submit Order
          </button>
        </form>
      </div>

      {/* loading */}
      {
        isScreenLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              inset: 0,
              position: 'fixed',
              zIndex: 999,
            }}
          >
            <ReactLoading type="spin" color="black" height="4rem" width="4rem" />
          </div>
        )
      }
    </>
  );
}
export default Products;
