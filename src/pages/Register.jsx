import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (data.password !== data.confirmPassword) {
      toast.error("Password ans Confirm Password must be same");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="rounded max-w-lg container mx-auto p-4 flex items-center">
      <div className="w-full bg-white my-4 mx-auto rounded p-7">
        <p>Welcome to Binkeyit</p>
        <form onSubmit={handleSubmit} className="grid gap-2 mt-3">
          <div className="grid">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter you name"
              id="name"
              autoFocus
              className="bg-blue-50 p-2 rounded border outline-none focus-within:border-primary-200"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              // autoFocus
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
                // autoFocus
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
          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="bg-blue-50 p-2 rounded border flex focus-within:border-primary-200">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                id="confirmPassword"
                // autoFocus
                className="bg-blue-50 w-full outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <div
                onClick={() => {
                  setShowConfirmPassword((prev) => !prev);
                }}
                className="cursor-pointer"
              >
                {showConfirmPassword ? (
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
            Register
          </button>
        </form>
        <p>
          Already have account ?{" "}
          <Link
            to="/login"
            className="font-medium text-orange-600 hover:text-orange-500"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
