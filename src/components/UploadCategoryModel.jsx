import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/uploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from '../utils/AxiosToastError'

const UploadCategoryModel = ({ close, fetchData }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const[ loading, setLoading ] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const response = await uploadImage(file);

    const { data: ImageResponse } = response;

    setData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data : data
      })
      const { data : responseData } = response;

      if(responseData.success){
        toast.success(responseData.message);
        close();
        fetchData();
      }
    }
    catch(error){
      AxiosToastError(error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white max-w-3xl w-full p-4 rounded">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-2" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label>Name</label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter Category Name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {data?.image ? (
                  <img
                    alt="category"
                    src={data.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${
                    data.name
                      ? "border-primary-200 hover:bg-primary-200"
                      : "bg-gray-400"
                  } px-4 py-2 rounded cursor-pointer border font-medium`}
                >
                  { loading ? "Uploading..." : "Upload Image" }
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <button
            className={`${
              data.name && data.image
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-300"
            } py-2 font-semibold rounded`}
          >
            {loading? "Adding Category" : "Add Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;
