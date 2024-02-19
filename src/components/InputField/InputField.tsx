import React, { ChangeEvent } from 'react';
import { capFirstLetter } from '@utils/functions';

interface Props {
  name: string;
  placeholder: string;
  error: string;
  value: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: any) => void;
}

const InputField = ({ name, value, placeholder, error, required, onChange }: Props) => {
  return (
    <div className="flex flex-col mt-6 mb-6 w-full text-primary">
      <label htmlFor="name" className="font-semibold block">
        {capFirstLetter(name)} {required && <span className="text-required">*</span>}
      </label>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="text-primary placeholder-primary rounded-lg px-3 py-2 font-semibold block outline-none border"
      />
      <span className='italic text-[14px]'>{error}</span>
    </div>
  );
};

export default InputField;
