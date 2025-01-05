import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
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
        ...SummaryApi.login,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="rounded max-w-lg container mx-auto p-4 flex items-center">
      <div className="w-full bg-white my-4 mx-auto rounded p-7">
        <p className="text-center text-2xl font-semibold tracking-wide">Login</p>
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
          <div className="grid gap-1">
            <label htmlFor="password">Password</label>
            <div className="bg-blue-50 p-2 rounded border flex focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                id="password"
                autoFocus
                className="bg-blue-50 w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
              />
              <div
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                className="cursor-pointer"
              >
                {showPassword ? (
                  <MdOutlineRemoveRedEye size={26} />
                ) : (
                  <FaRegEyeSlash size={26} />
                )}
              </div>
            </div>
          </div>
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-orange-600 hover:bg-orange-500" : "bg-gray-500"
            } py-2 rounded font-medium text-white text-lg my-3 tracking-wide`}
          >
            Login
          </button>
        </form>
        <p>
          Don't have account ?{" "}
          <Link
            to="/register"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
