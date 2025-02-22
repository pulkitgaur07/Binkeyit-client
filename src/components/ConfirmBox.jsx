import React from "react";
import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ close, confirm }) => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white max-w-md w-full p-4 rounded">
            <div className="flex items-center justify-between gap-3">
                <h1 className="font-semibold">Permanent Delete</h1>
                <button>
                    <IoClose size={25} onClick={close}/>
                </button>
            </div>
            <p className="my-4">Are you sure to delete permanently ?</p>
            <div className="w-fit ml-auto flex items-center gap-3">
                <button onClick={close} className="px-4 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white">Cancel</button>
                <button onClick={confirm} className="px-4 py-1 border rounded border-green-500 text-green-500 hover:bg-green-500 hover:text-white">Confirm</button>
            </div>
        </div>
    </div>
  );
};

export default ConfirmBox;
