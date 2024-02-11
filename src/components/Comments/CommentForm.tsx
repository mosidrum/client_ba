import { buttonStyle } from '@constants/styles';
import React, { FormEvent, useState } from 'react';

type Props = {
  label: string;
  formSubmitHandler: (comment: string) => void;
};

const CommentForm = ({ label, formSubmitHandler }: Props) => {
  const [value, setValue] = useState<string>('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col items-end border border-primary rounded-lg p-4'>
        <textarea
          className="w-full focus:outline-none bg-background2"
          value={value}
          placeholder="Comment here..."
          rows={5}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className='px-6 py-2.5 rounded-lg bg-primary mt-2 font-semibold text-background2'>
          {label}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
