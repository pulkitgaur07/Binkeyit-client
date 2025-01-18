import React, { useEffect, useRef, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["","","","","",""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();
  
  console.log("location ",location);


  const validValue = data.every((el) => el);

  useEffect(()=>{
    if(!location?.state?.email){
      navigate("/forgot-password");
    }
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp:data.json(""),
          email : location?.state?.email
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["","","","","",""]); 
        // navigate("/otp-verification");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="rounded max-w-lg container mx-auto p-4 flex items-center">
      <div className="w-full bg-white my-4 mx-auto rounded p-7">
        <p className="text-center text-2xl font-semibold tracking-wide">Otp Verification</p>
        <form onSubmit={handleSubmit} className="grid gap-2 mt-3">
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your Otp</label>
            <div className="flex items-center gap-2 justify-between mt-3">
                {
                    data.map((element,index)=>{
                        return(
                            <input
                                key={"otp"+index}
                                type="text"
                                id="otp"
                                ref={(ref)=>{
                                  inputRef.current[index] = ref;
                                  return ref;
                                }}
                                maxLength={1}
                                value={data[index]}
                                onChange={(e)=>{
                                    const value = e.target.value;
                                    console.log(value)
                                    const newData = [...data]
                                    newData[index] = value
                                    setData(newData);
                                    if(value && index < 5){
                                      inputRef.current[index+1].focus()
                                    }
                                }}
                                autoFocus
                                className="bg-blue-50 w-16 p-2 rounded border outline-none focus-within:border-primary-200 text-center font-semibold"
                            />
                        )
                    })
                }
            </div>
          </div>
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-orange-600 hover:bg-orange-500" : "bg-gray-500"
            } py-2 rounded font-medium text-white text-lg my-3 tracking-wide`}
          >
            Verify OTP
          </button>
        </form>
        <div className="flex justify-between">
        <p>
          Already have an account ?{" "}
          <Link
            to="/login"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Login
          </Link>
        </p>
        </div>
      </div>
    </section>
  );
};

export default OtpVerification;

