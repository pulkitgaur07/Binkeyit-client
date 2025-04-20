import { createContext, useContext, useEffect, useState } from "react";
import { handleAddItemCart } from "../store/cartProduct";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state?.user);

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: cartId,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };

  const fetchAddress = async ()=>{
    try{
      const response = await Axios({
        ...SummaryApi.getAddress
      })

      const { data : responseData } = response;
      if(responseData.success){
        dispatch(handleAddAddress(responseData.data));
      }
    }
    catch(error){
      AxiosToastError(error);
    }
  }

  const handleLogout = ()=>{
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  }

  useEffect(() => {
    if (user && user._id){
    fetchCartItem();
    // handleLogout();
    fetchAddress();
    }
  },[user]);

  useEffect(() => {
    const qty = cartItem?.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    setTotalQty(qty);

    const tPrice = cartItem?.reduce((prev, curr) => {
      const priceAfterDiscount = priceWithDiscount(
        curr.productId.price,
        curr.productId.discount
      );
      return prev + priceAfterDiscount * curr.quantity;
    }, 0);
    setTotalPrice(tPrice);

    const notDiscountPrice = cartItem?.reduce((prev, curr) => {
      return prev + (curr.productId.price * curr.quantity);
    }, 0);
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        totalQty,
        totalPrice,
        notDiscountTotalPrice
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
