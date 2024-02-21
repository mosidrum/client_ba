import { capFirstLetter } from '@utils/functions';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

type Props = {
  name: string;
  label: string;
  errors: any;
  register: any;
};

const PasswordField = ({ name, label, register, errors }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="flex flex-col mt-6 w-full text-primary relative">
        <label htmlFor="name" className="font-semibold block">
          {capFirstLetter(name)}
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          id={name}
          placeholder={`Enter ${name}`}
          {...register(label, { required: true })}
          className={`text-primary placeholder-primary placeholder-opacity-35 rounded-lg px-3 py-2 font-semibold block outline-none border ${
            errors[label] ? 'border-red-500' : ''
          }`}
        />
        <span className="absolute top-[57%] right-4" onClick={togglePassword}>
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </span>
      </div>
      <div>{errors[label] && <span className="text-sm">{errors[label].message}</span>}</div>
    </>
  );
};

export default PasswordField;
