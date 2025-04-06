import React, { useState } from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
    const [openAddress, setOpenAddress] = useState(false);
    const addressList = useSelector((state) => state.addresses.addressList);
    const [selectAddress, setSelectAddress] = useState(0);

  return (
    <section className="bg-blue-50">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4 justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="bg-white p-2 grid gap-4">
            {
              addressList?.map((address,index)=>{
                return(
                  <label htmlFor={"address"+index} className={!address.status && "hidden"}>
                    <div className="border rounded p-3 flex gap-3 hover:bg-blue-50">
                      <div>
                        <input id={"address"+index} type="radio" value={index} onChange={()=>setSelectAddress(e.target.value)} name="address" />
                      </div>
                      <div>
                        <p>{address.address_line}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.country} - {address.pincode}</p>
                        <p>{address.mobile}</p>
                      </div>
                    </div>
                  </label>
                )
              })
            }
            <div onClick={()=>setOpenAddress(true)} className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer">
              Add Address
            </div>
          </div>
        </div>
        <div className="w-full max-w-md bg-white px-2 py-4">
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="bg-white p-4">
            <h3 className="font-semibold">Bill Details</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>Total Items</p>
              <p className="text-sm flex items-center gap-2">
                <span className="line-through text-neutral-400">
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Total Quantity</p>
              <p className="text-sm flex items-center gap-2">
                {totalQty} items
              </p>
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
          <div className="w-full flex flex-col gap-4">
            <button className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded font-semibold">Online Payment</button>
            <button className="py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white rounded">Cash on Delivery</button>
          </div>
        </div>
      </div>
      {
        openAddress && (
          <AddAddress close={()=>setOpenAddress(false)} />
        )
      }
    </section>
  );
};

export default CheckoutPage;
