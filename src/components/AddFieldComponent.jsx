import React from "react";
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({ close, value, onChange, submit }) => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded p-4 max-w-md w-full">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-semibold">Add Field</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <input
          className="bg-blue-50 my-3 p-2 border outline-none focus-within:border-primary-200 rounded w-full "
          placeholder="Enter field name"
          value={value}
          onChange={onChange}
        />
        <button onClick={submit}
         className="bg-primary-200 hover:bg-primary-100 px-4 py-2 rounded mx-auto w-fit block">
        Add Field
      </button>
      </div>
    </section>
  );
};

export default AddFieldComponent;
