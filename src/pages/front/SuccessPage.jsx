// 外部資源
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

// 內部資源
import { CartContext } from "../../contexts/cartContext";
import { LoadingScreenContext } from "../../contexts/loadingScreenContext";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function SuccessPage(){
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});
  const [orderDataProducts, setOrderDataProducts] = useState([]);

  const { getCart } = useContext(CartContext);

  const getOrder = async(orderId) => {
    try {
      const url = `${BASE_URL}/api/${API_PATH}/order/${orderId}`;
      const response = await axios.get(url);
      console.log('getOrder', response.data.order);
      setOrderData(response.data.order);
      setOrderDataProducts(Object.values(response.data.order.products));
      getCart();
    } catch (error) {
      console.dir(error)
    }
  }

  useEffect(() => {
    getOrder(orderId);
    
  }, [orderId])
  
  return (
    <>
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 text-center">
            <i className="bi bi-check-circle text-success display-2"></i>
            <h1>Order Confirmed！</h1>
            <p>Your order has been placed successfully.</p>
          </div>
          <div className="col-lg-6">
            <h3>Order Summary</h3>
            <div>
              <ul className="list-unstyled mb-0 d-flex gap-5">
                <li>
                  <p>Date</p>
                  <span>{new Date(orderData.create_at * 1000).toLocaleDateString()}</span>
                </li>
                <li>
                  <p>Order Number</p>
                  <span>{orderData.id}</span>
                </li>
              </ul>
            </div>
            <div className="border">
              <p className="fs-6 border-bottom p-3">Summary <span>
                  ({orderDataProducts.reduce((sum, item) => sum + item.qty, 0)}{' '}
                    {orderDataProducts.reduce((sum, item) => sum + item.qty, 0) === 1 ? 'item' : 'items'}
                  )
                </span>
              </p>
              <ul className="list-unstyled border-bottom px-3 mb-0">
                {
                  orderDataProducts.map((item, index) => (
                    <li key={item.id} className={`d-flex ${index === orderDataProducts.length - 1 ? '' : 'border-bottom'} py-3 gap-3`}>
                      <div className="w-25">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.title}
                          className="img-fluid"
                        />
                      </div>
                      <div className="w-75 d-flex flex-column">
                        <p>{item.product.title}</p>
                        <div className="d-flex justify-content-between">
                          <p>Quantity：{item.qty}</p>
                          <p>£{item.final_total}</p>
                        </div>
                      </div>
                    </li>
                  ))
                }
              </ul>
              <div className="p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <p>
                    Subtotal <span>
                      ({orderDataProducts.reduce((sum, item) => sum + item.qty, 0)}{' '}
                        {orderDataProducts.reduce((sum, item) => sum + item.qty, 0) === 1 ? 'item' : 'items'}
                      )
                    </span>
                  </p>
                  <span>£{orderData.total}</span>
                </div>
                <p>Delivery fee</p>
                <div className="border-top mt-3 pt-3">
                  <p className="h4 d-flex align-items-center justify-content-between">Total <span>£{orderData.total}</span></p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="text-center mt-5">
          <Link to='/products' className="btn btn-primary rounded-pill w-50">CONTINUE SHOPPING</Link>
        </div>
      </div>
    </>
  )
}
export default SuccessPage;