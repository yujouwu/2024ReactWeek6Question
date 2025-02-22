// 外部 node_modules 資源
import { useContext, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// 內部 src 資源
import Input from "../../components/form/Input";
import Textarea from "../../components/form/Textarea";
import CheckboxRadio from "../../components/form/CheckboxRadio";
import { CartContext } from "../../contexts/cartContext";
import { LoadingScreenContext } from "../../contexts/loadingScreenContext";
import EmptyBasket from "../../components/front/emptyBasket";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CheckoutPage() {
  const { cart, basketQty, getCart } = useContext(CartContext);
  const { setIsLoadingScreen } = useContext(LoadingScreenContext);
  const navigate = useNavigate();

  // React hook form
  const {
    register, // state
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm({
    defaultValues: {
      category: "",
    },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    const { message, ...user } = data;
    const userInfo = {
      data: {
        user,
        message,
      },
    };
    checkout(userInfo);
  });

  // 客戶購物 - 結帳
  const checkout = async (data) => {
    setIsLoadingScreen(true);
    try {
      const url = `${BASE_URL}/api/${API_PATH}/order`;
      const response = await axios.post(url, data);
      // console.log(response);

      alert(response.data.message);
      navigate(`/success/${response.data.orderId}`);
    } catch (error) {
      console.dir(error);
      alert(error.response.data.message);
    } finally {
      setIsLoadingScreen(false);
    }
  };

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <>
      {basketQty === 0 ? (
        <EmptyBasket />
      ) : (
        // {/* order form */}
        <div className="container">
          <p className="h4">Checkout</p>
          <div className="row">
            <div className="col-lg-9">
              <p className="h5">Add delivery information</p>
              <form onSubmit={onSubmit}>
                <Input
                  register={register}
                  errors={errors}
                  id="name"
                  labelText="Name"
                  type="text"
                  rules={{
                    required: "Name is required",
                  }}
                />
                <Input
                  register={register}
                  errors={errors}
                  id="email"
                  labelText="Email"
                  type="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  }}
                />
                <Input
                  register={register}
                  errors={errors}
                  id="tel"
                  labelText="Phone Number"
                  type="tel"
                  rules={{
                    required: "Phone Number is required",
                    pattern: {
                      value: /^(0[2-8]\d{7}|09\d{8})$/,
                      message: "Invalid phone number format",
                    },
                  }}
                />
                <Input
                  register={register}
                  errors={errors}
                  id="address"
                  labelText="Address"
                  type="text"
                  rules={{
                    required: "Address is required",
                  }}
                />
                <Textarea
                  register={register}
                  errors={errors}
                  id="message"
                  labelText="Message"
                  rules={{}}
                />
                <CheckboxRadio
                  register={register}
                  errors={errors}
                  type="checkbox"
                  id="isCheckForm"
                  labelText="Check me out"
                  rules={{
                    required:
                      "Please check the box to agree to the Terms and Conditions.",
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={cart.carts?.length < 1}
                >
                  Submit Order
                </button>
              </form>
            </div>
            <div className="col-lg-3">
              <div className="border">
                <p className="fs-6 border-bottom p-3">
                  Summary{" "}
                  <span>
                    ({basketQty} {basketQty === 1 ? "item" : "items"})
                  </span>
                </p>
                <ul className="list-unstyled border-bottom px-3 mb-0">
                  {cart?.carts?.map((cartItem, index) => (
                    <li
                      key={cartItem.id}
                      className={`d-flex ${
                        index === cart.carts.length - 1 ? "" : "border-bottom"
                      } py-3 gap-3`}
                    >
                      <div className="w-25">
                        <img
                          src={cartItem.product.imageUrl}
                          alt={cartItem.product.title}
                          className="img-fluid"
                        />
                      </div>
                      <div className="w-75 d-flex flex-column">
                        <p>{cartItem.product.title}</p>
                        <div className="d-flex justify-content-between">
                          <p>Quantity：{cartItem.qty}</p>
                          <p>£{cartItem.final_total}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <p>
                      Subtotal{" "}
                      <span>
                        ({basketQty} {basketQty === 1 ? "item" : "items"})
                      </span>
                    </p>
                    <span>£{cart?.final_total}</span>
                  </div>
                  <p>Delivery fee</p>
                  <div className="border-top mt-3 pt-3">
                    <p className="h4 d-flex align-items-center justify-content-between">
                      Total <span>£{cart?.final_total}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default CheckoutPage;
