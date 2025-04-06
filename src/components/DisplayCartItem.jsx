import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import EmptyCart from "../assets/shopping_cart.png";
import toast from "react-hot-toast";

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector(state => state.cartItem.cart);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = ()=>{
    if(user?._id){
      navigate("/checkout");
      if(close){
        close();
      }
      return;
    }
    toast("Please login");
  }

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-black z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
        <div className="flex items-center p-4 shadow justify-between gap-3">
          <h2 className="font-semibold">Cart</h2>
          <Link to={"/"} className="lg:hidden"></Link>
          <button className="hidden lg:block" onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <div className="min-h-[80vh] max-h-[calc(100vh-120px)] h-full bg-blue-50 p-2 flex flex-col gap-4">
          {
            cartItem[0] ? (
              <>
                <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                  <p>Your total savings</p>
                  <p>{DisplayPriceInRupees(notDiscountTotalPrice-totalPrice)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                  {
                    cartItem[0] && (
                      cartItem.map((item,index)=>{
                        return (
                          <div key={item?._id+"cartItemDisplay"} className="flex w-full gap-4">
                            <div className="h-16 w-16 min-h-16 min-w-16 border rounded">
                              <img src={item?.productId?.image[0]} className="object-scale-down" />
                            </div>
                            <div className="w-full max-w-sm text-xs">
                              <p className="text-ellipsis line-clamp-2">{item?.productId?.name}</p>
                              <p className="text-slate-400">{item?.productId?.unit}</p>
                              <p className="font-semibold">{DisplayPriceInRupees(priceWithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                            </div>
                            <div>
                              <AddToCartButton data={item?.productId} />
                            </div>
                          </div>
                        )
                      })
                    )
                  }
                </div>
                <div className="bg-white p-4">
                  <h3 className="font-semibold">Bill Details</h3>
                  <div className="flex gap-4 justify-between ml-1">
                    <p>Total Items</p>
                    <p className="text-sm flex items-center gap-2"><span className="line-through text-neutral-400">{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
                  </div>
                  <div className="flex gap-4 justify-between ml-1">
                    <p>Total Quantity</p>
                    <p className="text-sm flex items-center gap-2">{totalQty} items</p>
                  </div>
                  <div className="flex gap-4 justify-between ml-1">
                    <p>Delivery Charge</p>
                    <p className="text-sm flex items-center gap-2">Free</p>
                  </div>
                  <div className="font-semibold flex items-center justify-between gap-4">
                    <p>Grand Total</p>
                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white flex flex-col justify-center items-center">
                <img src={EmptyCart} className="h-full w-full object-scale-down" />
                <Link to={"/"} onClick={close} className="bg-green-600 px-4 py-2 text-white rounded">Shop Now</Link>
              </div>
            )
          }
        </div>
        {
          cartItem[0] && (
            <div className="p-2">
              <div className="bg-green-700 text-white p-4 sticky bottom-3 rounded flex items-center gap-4 justify-between">
                <div>{DisplayPriceInRupees(totalPrice)}</div>
                <button onClick={redirectToCheckoutPage} className="flex items-center gap-1 hover:cursor-pointer">
                  Proceed{" "}
                  <span>
                    <FaCaretRight />
                  </span>
                </button>
              </div>
            </div>
          )
        }
      </div>
    </section>
  );
};

export default DisplayCartItem;
