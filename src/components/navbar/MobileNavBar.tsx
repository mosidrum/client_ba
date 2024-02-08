import { paths } from '@routes/paths';
import { NavLink } from 'customTypes';
import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type Props = {
  navLink: NavLink[];
  buttonStyle: string;
};

const MobileNavBar = ({ navLink, buttonStyle }: Props) => {
  const [dropdown, setDropdown] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="fixed z-50 bg-background2 text-primary h-full -mt-20 w-full p-4 transition-all duration-1000">
      <nav className="flex items-center gap-14 flex-col justify-center m-auto">
        <ul className="flex flex-col items-center gap-10 mt-20">
          {navLink.map((link, index: number) => (
            <li
              className="hover:cursor-pointer border-2 border-primary rounded-full py-1 px-8 relative"
              key={index}
              onClick={() => {
                if (link.icon) {
                  setDropdown(!dropdown);
                } else {
                  navigate(paths[link.path]);
                }
              }}
            >
              <div className="flex gap-2 items-center">
                <div>{link.name}</div>
                <div>{link.icon && (dropdown ? <FaAngleUp /> : <FaAngleDown />)}</div>
              </div>
              {link.icon && dropdown && (
                <ul className="absolute top-full left-full ml-2 bg-white rounded-md shadow-lg">
                  {link.dropdown &&
                    link.dropdown.map((link, index: number) => (
                      <li
                        key={index}
                        onClick={() => navigate(paths[link.path])}
                        className="hover:bg-background2 px-4 py-2 cursor-pointer"
                      >
                        {link.name}
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <button className={buttonStyle}>Sign In</button>
      </nav>
    </div>
  );
};

export default MobileNavBar;
