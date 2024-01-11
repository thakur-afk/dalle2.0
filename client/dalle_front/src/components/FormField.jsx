import React from "react";

const FormField = ({
  labelName,
  name,
  type,
  value,
  handleChange,
  supriseMe,
  handleSupriseMe,
  placeholder,
}) => {
  return (
    <div>
      <div className="flex gap-3 p-1 ">
        <label>{labelName}</label>
        {supriseMe && (
          <button
            type="button"
            onClick={handleSupriseMe}
            className=" bg-gray-200 rounded-md px-2 text-sm"
          >
            Suprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className=" bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-3"
      ></input>
    </div>
  );
};

export default FormField;
