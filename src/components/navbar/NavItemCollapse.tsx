import { MenuItem } from '@customTypes/Types';
import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

type Props = Omit<MenuItem, 'type' | 'link' | 'id'> & {
  largeScreen: boolean | number | null;
  activeNavId: string;
  setActiveNavId: React.Dispatch<React.SetStateAction<string>>;
  isMenuClicked: boolean;
  setIsMenuClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavItemCollapse = ({ title, icon, setActiveNavId, activeNavId, content, isMenuClicked, setIsMenuClicked, largeScreen }: Props) => {
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <div className="font-semibold text-background2 flex flex-col mb-2 gap-x-2 py-2 px-2 border rounded-md text-lg">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setDropdown(!dropdown)}>
          <div className="flex items-center gap-x-2">
            {icon}
            {title}
          </div>
          <span className="self-auto p-2">{dropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </div>
        {dropdown &&
          content?.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveNavId(item.id); navigate(item.link); largeScreen ?  setIsMenuClicked(true) :  setIsMenuClicked(!isMenuClicked);
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
