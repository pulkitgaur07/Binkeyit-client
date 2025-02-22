import React from "react";
import { IoClose } from "react-icons/io5";

const ViewImage = ({ url, close }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md max-h-[80vh] p-4 bg-white rounded">
        <button className="w-fit ml-auto block">
          <IoClose onClick={close} size={25} />
        </button>
        <img
          src={url}
          alt="Full Screen"
          className="w-full h-full object-scale-down"
        />
      </div>
    </div>
  );
};

export default ViewImage;
