import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/uploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const EditSubCategory = ({ close, data, fetchData }) => {
  const [subCategoryData, setSubCategoryData] = useState({
    _id : data._id,
    name: data.name,
    image: data.image,
    category: data.category,
  });

  const [loading, setLoading] = useState(false);

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    subCategoryData.category.splice(index, 1);
    setSubCategoryData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const handleSubmitSubCategory = async (e)=>{
    e.preventDefault();

    try{
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data : subCategoryData
      })

      const { data : responseData } = response;

      if(responseData.success){
        toast.success(responseData.message);
        if(close){
          close();
        }
        if(fetchData){
            fetchData();
        }
      }
    }
    catch(error){
      AxiosToastError(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setLoading(true);
    const response = await uploadImage(file);
    
    setLoading(false);
    const { data: ImageResponse } = response;

    setSubCategoryData((prev) => {
      return {
        ...prev,
        image: ImageResponse.data.url,
      };
    });
  };
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl p-4 rounded">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Edit Sub Category</h1>
          <button onClick={close} className="w-fit block ml-auto">
            <IoClose size={25} />
          </button>
        </div>
        <form className="my-3 grid gap-2" onSubmit={handleSubmitSubCategory}>
          <div className="grid gap-1">
            <label>Sub Category Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Category Name"
              value={subCategoryData.name}
              name="name"
              onChange={handleChange}
              className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
            />
          </div>
          <div className="grid gap-1">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row items-center">
              <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                {subCategoryData?.image ? (
                  <img
                    alt="category"
                    src={subCategoryData.image}
                    className="w-full h-full object-scale-down"
                  />
                ) : (
                  <p className="text-sm text-neutral-500">No Image</p>
                )}
              </div>
              <label htmlFor="uploadCategoryImage">
                <div
                  className={`${
                    subCategoryData.name
                      ? "border-primary-200 hover:bg-primary-200"
                      : "bg-gray-400"
                  } px-4 py-2 rounded cursor-pointer border font-medium`}
                >
                  {loading ? "Uploading..." : "Upload Image"}
                </div>
                <input
                  disabled={!subCategoryData.name}
                  onChange={handleUploadSubCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="grid gap-1">
            <label>Select Category</label>
            <div className="border focus-within:border-primary-200 rounded outline-none">
              <div className="flex flex-wrap gap-2 ">
                {subCategoryData.category.map((cat, index) => {
                  return (
                    <p
                      key={cat._id + "selectedValue"}
                      className="bg-white shadow-md px-1 m-1 flex items-center gap-2"
                    >
                      {cat.name}
                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                      >
                        <IoClose size={20} />
                      </div>
                    </p>
                  );
                })}
              </div>
              <select
                className="w-full p-2 bg-transparent outline-none border"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id === value
                  );
                  setSubCategoryData((prev) => {
                    return {
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value={""}>
                  Select Category
                </option>
                {allCategory.map((category, index) => (
                  <option
                    key={category._id + "subcategory"}
                    value={category._id}
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className={`${
              subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0]
                ? "bg-primary-200 hover:bg-primary-100"
                : "bg-gray-300"
            } py-2 font-semibold rounded`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditSubCategory;

