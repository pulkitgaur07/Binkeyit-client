import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        console.log(data);
        toast.success(response.data.message);
        navigate("/otp-verification",{
          state: data,
        });
        setData({
          email: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="rounded max-w-lg container mx-auto p-4 flex items-center">
      <div className="w-full bg-white my-4 mx-auto rounded p-7">
        <p className="text-center text-2xl font-semibold tracking-wide">Forgot Password</p>
        <form onSubmit={handleSubmit} className="grid gap-2 mt-3">
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              autoFocus
              className="bg-blue-50 p-2 rounded border outline-none focus-within:border-primary-200"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-orange-600 hover:bg-orange-500" : "bg-gray-500"
            } py-2 rounded font-medium text-white text-lg my-3 tracking-wide`}
          >
            Send Otp
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

export default ForgotPassword;
