import React from "react";

const SelectField = ({ label, id, value, onChange, options }) => (
  <div className="mt-6">
    <label htmlFor={id} className="block text-lg font-medium text-black">
      {label}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-black"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
