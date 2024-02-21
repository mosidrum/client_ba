import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';

type Props = {
  type: string;
  message: string;
};

const Alert = ({ type, message }: Props) => {
  const [open, setOpen] = useState(true);
  const alertType = type === 'success' ? 'border-gree-500' : 'border-red-500';
  return (
    <>
      {open && (
        <div
          className={`${alertType} flex justify-between items-center p-2 mb-6 border rounded-md`}
        >
          <div>{message}</div>
          <div onClick={() => setOpen(!open)} className="hover:cursor-pointer">
            <MdOutlineClose />
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
