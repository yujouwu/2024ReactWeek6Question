// 外部 node_modules 資源
import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// 內部 src 資源
import { LoadingScreenContext } from "./loadingScreenContext";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

// useContext 跨元件傳遞
export const CartContext = createContext();

const initState = {
  cart: {},
  basketQty: 0
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'GET_CART':
      return {
        ...state,
        cart: action.payload,
        basketQty: action.payload.carts.reduce((sum, item) => sum + item.qty, 0)
      };
    default:
      return state;
  }
}
export const CartProvider = ({children}) => {
  const { isLoadingScreen, setIsLoadingScreen } = useContext(LoadingScreenContext);
  const [cartState, cartDispatch] = useReducer(cartReducer, initState);

  // const getCart = useCallback(async() => {
  //   setIsLoadingScreen(true)
  //   try {
  //     const url = `${BASE_URL}/api/${API_PATH}/cart`;
  //     const response = await axios.get(url);
  //     const cartData = response.data.data;   
  //     cartDispatch({
  //       type: 'GET_CART',
  //       payload: cartData
  //     });
      
  //   } catch (error) {
  //     console.dir(error);
  //   } finally{
  //     setIsLoadingScreen(false)
  //   }
  // }, [setIsLoadingScreen]) 

  // useEffect(() => {
  //   getCart();
  // }, [getCart])

  const getCart = async() => {
    setIsLoadingScreen(true)
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const response = await axios.get(url);
      const cartData = response.data.data;   
      cartDispatch({
        type: 'GET_CART',
        payload: cartData
      });
      
    } catch (error) {
      console.dir(error);
    } finally{
      setIsLoadingScreen(false)
    }
  } 

  useEffect(() => {
    getCart();
  }, [])

  const addCart = async(productId, qty) => {
    setIsLoadingScreen(true)
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const data = {
        "data": {
          "product_id": productId,
          "qty": qty
        }
      }
      await axios.post(url, data);
      // console.log(response);
      // alert(response.data.message);
      getCart();
    } catch (error) {
      console.dir(error);
      // alert(`加入購物車失敗：${error.response.data.message}`);
    } finally {
      setIsLoadingScreen(false)
    }
  }

  // 更新商品數量
  const updateCart = async(cartId, productId, qty) => {
    setIsLoadingScreen(true);
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
      // alert(`更新購物車失敗：${error.response.data.message}`);
    } finally{
      setIsLoadingScreen(false);
    }
  }

  // 刪除購物車 (全部)
  const deleteCartAll = async() => {
    setIsLoadingScreen(true);
    try {
      const url = `${BASE_URL}/api/${API_PATH}/carts`;
      await axios.delete(url);
      // console.log(response);
      // alert(response.data.message);
      getCart();
    } catch (error) {
      console.dire(error);
      // alert(`清空購物車失敗：${error.response.data.message}`)
    } finally{
      setIsLoadingScreen(false);
    }
  }

  // 刪除購物車 (單一)
  const deleteCartOne = async(cartId) => {
    setIsLoadingScreen(true);
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart/${cartId}`;
      await axios.delete(url);
      // console.log(response);
      // alert(response.data.message);
      getCart();
    } catch (error) {
      console.dire(error);
      // alert(`移除產品車失敗：${error.response.data.message}`)
    } finally{
      setIsLoadingScreen(false);
    }
  }

  return (
    <CartContext.Provider value={{cart: cartState.cart, basketQty: cartState.basketQty, getCart, addCart, updateCart, deleteCartAll, deleteCartOne, isLoadingScreen}}>
      {children}
    </CartContext.Provider>
  )
} 
CartProvider.propTypes = {
  children: PropTypes.array,
}