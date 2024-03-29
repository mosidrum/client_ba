import { buttonStyle } from '@constants/styles';
import React, { FormEvent, useState } from 'react';
import { Loader } from '@components/Loader';

type Props = {
  label: string;
  defaultValue?: string;
  formSubmitHandler: (comment: string) => void;
  loading?: boolean;
};

const CommentForm = ({ label, formSubmitHandler, defaultValue, loading }: Props) => {
  const [value, setValue] = useState<string>(defaultValue || '');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4 bg-transparent">
        <textarea
          className="w-full focus:outline-none bg-background2"
          value={value}
          placeholder="Comment here..."
          rows={5}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="flex items-center px-4 py-2.5 rounded-lg bg-primary mt-2 font-semibold text-background2"
        >
          <span>{label}</span>
          {loading ? (
            <span className="w-8 h-8">
              <Loader />
            </span>
          ) : (
            ''
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
