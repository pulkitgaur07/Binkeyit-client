import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import image1 from "../assets/10_minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";

const ProductDisplayPage = () => {
  const params = useParams();
  const productId = params?.product?.split("-")?.slice(-1)[0];

  const [data, setData] = useState({
    name: "",
    image: [],
  });

  const [image, setImage] = useState(0);

  const [loading, setLoading] = useState(false);

  const imageContainer = useRef();

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });

      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2">
      <div className="">
        <div className="bg-white rounded min-h-56 max-h-56 lg:min-h-[60vh] lg:max-h-[60vh] h-full w-full">
          <img
            src={data.image[image]}
            className="w-full h-full object-scale-down"
          />
        </div>
        <div className="flex items-center justify-center gap-2 my-3">
          {data.image.map((img, index) => {
            return (
              <div
                key={img + index + "point"}
                className={`bg-slate-300 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
                  index === image && "bg-slate-400"
                }`}
              ></div>
            );
          })}
        </div>
        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex z-10 relative gap-3 w-full overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, index) => {
              return (
                <div
                  className={`w-20 h-20 min-h-20 min-w-20 shadow cursor-pointer rounded bg-white p-1 ${index === image && "border border-green-600"}`}
                  key={img + index}
                >
                  <img
                    src={img}
                    alt="mini-product"
                    onClick={() => setImage(index)}
                    className="w-full h-full object-scale-down"
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full h-full -ml-3 flex justify-between absolute items-center">
            <button
              onClick={handleScrollLeft}
              className="z-10 bg-white relative p-1 rounded-full shadow-lg "
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-10 bg-white relative p-1 rounded-full shadow-lg "
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="my-4 hidden lg:grid gap-3">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-sm">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-sm">{data.unit}</p>
          </div>
          {
            data.more_details && object.keys(data?.more_details).map((ele,index)=>{
              return(
                <div>
                  <p className="font-semibold">{ele}</p>
                  <p className="text-sm">{data?.more_details[ele]}</p>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 w-fit px-2 rounded-full ">10 min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
        <p className="">{data.unit}</p>
        <Divider />
        <div>
          <p className="">Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {DisplayPriceInRupees(
                  priceWithDiscount(data.price, data.discount)
                )}
              </p>
            </div>
            {data.discount && (
              <p className="line-through">{DisplayPriceInRupees(data.price)}</p>
            )}
            {data.discount && (
              <p className="font-bold text-green-600 lg:text-2xl">
                {data.discount}%{" "}
                <span className="text-base text-neutral-600">Discount</span>
              </p>
            )}
          </div>
        </div>
        {data.stock === 0 ? (
          <p className="text-lg text-red-500 my-2">Out Of Stock</p>
        ) : (
          <div className="py-4">
            <AddToCartButton data={data} />
          </div>
        )}
        <h2 className="font-semibold">Why shop from binkeyit?</h2>
        <div>
          <div className="flex items-center gap-4 my-4">
            <img src={image1} alt='superfast delivery' className='w-16 h-16 ' />
            <div className="text-sm">
              <div className="font-semibold">Superfast delivery</div>
              <p>
                Get your order delivered to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={image2} alt='best price offers' className='w-16 h-16 ' />
            <div className="text-sm">
              <div className="font-semibold">Best Prices & Offers</div>
              <p>
                Best price destination with offers directly from the
                manufacturers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img src={image3} alt='wide assortment' className='w-16 h-16 ' />
            <div className="text-sm">
              <div className="font-semibold">Wide Assortment</div>
              <p>
                Choose from 5000+ products across food personal care, household
                and other categories.
              </p>
            </div>
          </div>
        </div>
        <div className="my-4 grid gap-3 lg:hidden">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-sm">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-sm">{data.unit}</p>
          </div>
          {
            data.more_details && object.keys(data?.more_details).map((ele,index)=>{
              return(
                <div>
                  <p className="font-semibold">{ele}</p>
                  <p className="text-sm">{data?.more_details[ele]}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
