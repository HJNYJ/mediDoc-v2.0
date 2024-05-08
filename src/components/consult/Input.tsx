import React from "react";

const Input = ({ label, placeholder, value, onChange, required }) => {
  return (
    <div>
      <p className="regular-16 text-gray-800">{label}</p>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-[358px] h-[51px] rounded-lg border mt-3 mb-6 text-gray-600"
        required={required}
      />
    </div>
  );
};

export default Input;
