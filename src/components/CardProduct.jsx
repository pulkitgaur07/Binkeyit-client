import React from "react";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { Link } from "react-router-dom";
import { ValidURLConvert } from "../utils/ValidURLConvert";
import { priceWithDiscount } from "../utils/PriceWithDiscount";

const CardProduct = ({ data }) => {
  const url = `/product/${ValidURLConvert(data.name)}-${data._id}`;
  return (
    <Link
      to={url}
      className="border py-2 p-2 grid gap-3 max-w-36 lg:min-w-48 w-full rounded cursor-pointer bg-white"
    >
      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
        <img
          src={data.image[0]}
          className="w-full h-full object-scale-down lg:scale-125"
        />
      </div>
      <div className="flex items-center gap-1">
        <div className="p-1 rounded text-xs w-fit px-2 text-green-600 bg-green-100">
          10 min
        </div>
        <div>
          {Boolean(data.discount) && (
            <p className="text-green-700 bg-green-100 px-2 w-fit text-xs rounded">{data.discount}% discount</p>
          )}
        </div>
      </div>
      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {data.name}
      </div>
      <div className="w-fit px-2 lg:px-0 text-sm lg:text-base">{data.unit}</div>
      <div className="px-2 lg:px-0 flex items-center justify-between gap-3 text-sm lg:text-base">
        <div className="font-semibold">
          {DisplayPriceInRupees(priceWithDiscount(data.price, data.discount))}
        </div>
        <div className="">
          {
            data.stock === 0 ? (
              <p className="text-red-500 text-sm text-center">Out Of Stock</p>
            ) : (
              <button className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded">
                Add
              </button>
            )
          }
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
