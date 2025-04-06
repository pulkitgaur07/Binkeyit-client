import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "../components/AddAddress";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useGlobalContext } from "../provider/GlobalProvider";
import toast from "react-hot-toast";

const Address = () => {
  const addressList = useSelector((state) => state.addresses.addressList);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const { fetchAddress } = useGlobalContext();

  const handleDisableAddress = async (id)=>{
    try{
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data : {
          _id : id
        }
      })

      const { data : responseData } = response;
      if(responseData.success){
        toast.success(responseData.message);
        if(fetchAddress){
          fetchAddress();
        }
      }
    }
    catch(error){
      AxiosToastError(error);
    }
  }

  return (
    <div>
      <div className="bg-white shadow-md p-4 mb-2 flex items-center justify-between gap-4">
        <h2 className="font-semibold text-ellipsis line-clamp-1">Address</h2>
        <button
          onClick={() => setOpenAddress(true)}
          className="border border-primary-200 text-primary-200 px-3 py-1 rounded-full hover:bg-primary-200 hover:text-black"
        >
          Add Address
        </button>
      </div>
      <div className="bg-white p-2 grid gap-4">
        {addressList?.map((address, index) => {
          return (
            <div className={`border rounded p-3 flex gap-3 hover:bg-blue-50 ${!address.status && 'hidden'}`}>
              <div className="w-full">
                <p>{address.address_line}</p>
                <p>{address.city}</p>
                <p>{address.state}</p>
                <p>
                  {address.country} - {address.pincode}
                </p>
                <p>{address.mobile}</p>
              </div>
              <div className="">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(address);
                  }}
                  className="bg-green-200 text-green-500 rounded p-1 hover:bg-green-600 hover:text-white"
                >
                  <MdEdit size={20} />
                </button>
                <button onClick={()=> handleDisableAddress(address._id)} className="bg-red-200 text-red-500 rounded p-1 hover:bg-red-600 hover:text-white">
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {openEdit && <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />}
    </div>
  );
};

export default Address;
