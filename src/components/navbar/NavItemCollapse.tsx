import { MenuItem } from '@customTypes/Types';
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { MdTitle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

type Props = Omit<MenuItem, 'type' | 'link'> & {
  activeNavId: string;
  setActiveNavId: React.Dispatch<React.SetStateAction<string>>;
};

const NavItemCollapse = ({ title, icon, id, setActiveNavId, activeNavId, content }: Props) => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  return (
    <div onClick={() => setDropdown(!dropdown)}>
      <div className="font-semibold text-background2 flex flex-col mb-2 gap-x-2 py-2 px-2 border rounded-md text-lg">
        <div className="flex justify-between items-center cursor-pointer">
          <div className="flex items-center gap-x-2">
            {icon}
            {title}
          </div>
          <span className="self-auto">{dropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </div>
        {dropdown &&
          content?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveNavId(id), navigate(item.link);
              }}
              className={`${item.id === activeNavId ? 'font-bold text-primary bg-background2' : 'font-semibold text-background2'} w-3/4 self-end flex items-center justify-end m-2 gap-x-2 py-2 px-2 border rounded-md text-lg cursor-pointer`}
            >
              {item.icon}
              {item.title}
            </div>
          ))}
      </div>
    </div>
  );
};

export default NavItemCollapse;
