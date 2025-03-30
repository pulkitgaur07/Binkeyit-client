import React, { useEffect, useState } from "react";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearch } from "react-icons/io5";

const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search : search
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalCount);
        setProductData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChange = (e)=>{
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  }

  useEffect(() => {
    let flag = true;
    const interval = setTimeout(()=>{
      if(flag){
        fetchProductData();
        flag = false;
      }
    },300);
    return ()=>{
      clearTimeout(interval);
    }
  }, [page,search]);

  return (
    <section>
      <div className="p-5 shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold">Products</h2>
        <div className="bg-blue-50 min-w-24 max-w-56 w-full ml-auto px-4 flex items-center gap-3 py-2 border rounded focus-within:border-primary-200">
          <IoSearch size={25} />
          <input
            type="text"
            placeholder="search product here"
            className="h-full w-full bg-transparent outline-none"
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>
      {loading && <Loading />}
      <div className="p-4 bg-blue-50 ">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productData.map((p, index) => {
              return <ProductCardAdmin fetchProductData={fetchProductData} data={p} />;
            })}
          </div>
        </div>
        <div className="flex jutsify-between my-4">
          <button
            hidden={page === 1}
            onClick={handlePrevious}
            className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
          >
            Previous
          </button>
          <button className="w-full bg-white">
            {page}/{totalPageCount}
          </button>
          <button
            hidden={page === totalPageCount}
            onClick={handleNext}
            className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductAdmin;
