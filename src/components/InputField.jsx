import React from "react";

const InputField = ({
  label,
  id,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
  name,
}) => (
  <div>
    <label htmlFor={id} className="block text-lg font-medium text-black">
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-black ${
        disabled ? "bg-gray-200" : ""
      }`}
      required={required}
      disabled={disabled}
      name={name}
    />
  </div>
);

export default InputField;
