import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  console.log(data);
  const validValue = Object.values(data).every((el) => el);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name] : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        console.log(data);
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword : "",
          confirmPassword : ""
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);
  return (
    <section className="rounded max-w-lg container mx-auto p-4 flex items-center">
      <div className="w-full bg-white my-4 mx-auto rounded p-7">
        <p className="text-center text-2xl font-semibold tracking-wide">
          Reset Password
        </p>
        <form onSubmit={handleSubmit} className="grid gap-2 mt-3">
          <div className="grid gap-1">
            <label htmlFor="newPassword">New Password</label>
            <div className="bg-blue-50 p-2 rounded border flex focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your New Password"
                id="newPassword"
                autoFocus
                className="bg-blue-50 w-full outline-none"
                name="newPassword"
                value={data.newPassword}
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
                placeholder="Enter your Confirm Password"
                id="confirmPassword"
                autoFocus
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
            Change Password 
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

export default ResetPassword;
