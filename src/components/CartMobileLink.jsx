import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { FaCaretRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartMobileLink = () => {
  const { totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  return (
    <>
      {cartItem[0] && (
        <div className="sticky bottom-4 p-2 z-40 lg:hidden">
          <div className="bg-green-600 px-2 py-1 rounded text-white text-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500 rounded w-fit">
                <FaCartShopping />
              </div>
              <div className="text-xs">
                <p>{totalQty} Items</p>
                <p>{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>
            <Link to={"/cart"} className="flex items-center gap-1">
              <span>View Cart</span>
              <FaCaretRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobileLink;
