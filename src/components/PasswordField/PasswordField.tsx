import { capFirstLetter } from '@utils/functions';
import React, { ChangeEvent, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

type Props = {
  name: string;
  placeholder: string;
  error: string;
  value: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PasswordField = ({ name, placeholder, error, value, required, onChange }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col mt-6 mb-6 w-full text-primary relative">
      <label htmlFor="name" className="font-semibold block">
        {capFirstLetter(name)} {required && <span className="text-required">*</span>}
      </label>
      <input
        type={showPassword ? 'text' : 'password'}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="text-primary placeholder-primary rounded-lg px-3 py-2 font-semibold block outline-none border"
      />
      <span className="absolute top-[55%] right-4" onClick={togglePassword}>
        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
      </span>
      <span className="italic text-[14px]">{error}</span>
    </div>
  );
};

export default PasswordField;
