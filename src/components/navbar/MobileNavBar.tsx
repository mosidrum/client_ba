import { images } from '@constants/images';
import { paths } from '@routes/paths';
import { NavLink } from 'customTypes';
import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type Props = {
  navLink: NavLink[];
  buttonStyle: string;
  setMenuClicked: React.Dispatch<React.SetStateAction<boolean>>;
  showLogout: boolean;
  setShowLogout: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
};

const MobileNavBar = ({
  navLink,
  buttonStyle,
  showLogout,
  setShowLogout,
  setMenuClicked,
  handleLogout
}: Props) => {
  const userState = useSelector((state: any) => state.user);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div className="fixed z-50 bg-background2 text-primary h-full -mt-7 w-full p-4 transition-all duration-1000">
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
                  setMenuClicked(false);
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
          <div>
            {userState.userInfo ? (
              <div>
                <div
                  onClick={() => setShowLogout(!showLogout)}
                  className="flex items-center gap-x-2"
                >
                  <img src={images.PostProfileImage} alt="Profile" />
                  {showLogout ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                <div className="text-sm"> {userState.userInfo.name}</div>
              </div>
            ) : (
              <div className={`${buttonStyle} hover:cursor-pointer`} onClick={() => navigate(paths.login)}>
                Sign In
              </div>
            )}
            {showLogout && (
              <ul className="absolute text-sm w-[150px] bg-background2 text-center text-primary flex flex-col justify-center gap-4 p-4 rounded-lg mt-2">
                <li className=" hover:bg-primary2 hover:text-background2 border border-primary2 rounded-lg p-2">
                  Dashboard
                </li>
                <li
                  onClick={handleLogout}
                  className=" hover:bg-primary2 hover:text-background2 border border-primary2 rounded-lg p-1 hover:cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default MobileNavBar;
