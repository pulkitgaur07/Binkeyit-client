import React, { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import EditCategoryModel from "../components/EditCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import ConfirmBox from "../components/ConfirmBox";
import AxiosToastError from "../utils/AxiosToastError";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [openCUploadategory, setOpenCUploadategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  // const allCategory = useSelector(state=>state.product.allCategory);

  // useEffect(()=>{
  //   setCategoryData(allCategory);
  // },[allCategory]);

  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });

  const handleDeleteCategory = async () => {
    try{
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data : deleteCategory
      })

      const { data : responseData } = response;

      if(responseData.success){
        toast.success(responseData.message);
        fetchCategory();
        setOpenConfirmBoxDelete(false);
      }
    }
    catch(error){
      AxiosToastError(error);
    }
  };

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <section>
      <div className="p-5 shadow-md flex items-center justify-between">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenCUploadategory(true)}
          className="text-sm border border-primary-200 hover:bg-primary-100 px-3 py-1 rounded"
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-auto">
        {categoryData.map((category, index) => {
          return (
            <div
              key={index}
              className="w-32 h-56 bg-[#EDF4FF] rounded shadow-md"
            >
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down"
              />
              <div className="flex items-center h-9 gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteCategory(category);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {loading && <Loading />}
      {openEdit && (
        <EditCategoryModel
          data={editData}
          fetchData={fetchCategory}
          close={() => setOpenEdit(false)}
        />
      )}
      {openCUploadategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenCUploadategory(false)}
        />
      )}
      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
};

export default CategoryPage;
