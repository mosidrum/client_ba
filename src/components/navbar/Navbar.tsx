import { FaBlog, FaBars, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { LiaTimesCircle } from 'react-icons/lia';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@routes/paths';
import { onMobileScreen } from '@hooks/onMobileScreen';
import { NavLink } from 'customTypes';
import { MobileNavbar } from '@components/navbar';
import { buttonStyle } from '@constants/styles';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@store/userActions';
import { images } from '@constants/images';
import { ThunkDispatch } from '@reduxjs/toolkit';

export const navLink: NavLink[] = [
  {
    name: 'Articles',
    path: 'articles'
  },
  {
    name: 'Pages',
    path: 'pages',
    icon: true,
    dropdown: [
      {
        name: 'About',
        path: 'about'
      },
      {
        name: 'Contact',
        path: 'contact'
      }
    ]
  },
  {
    name: 'Pricing',
    path: 'pricing'
  },
  {
    name: 'Register',
    path: 'register'
  }
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch:ThunkDispatch<any, any, any> = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const mobileScreen = onMobileScreen('(max-width: 768px)');
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section>
      <header className="w-full h-20 mx-auto py-4 px-5 sm:px-5 lg:px-14 flex justify-between gap-10 items-center shadow-2xl fixed top-0 z-50 bg-background2">
        <div>
          <FaBlog
            className="w-10 h-10 hover:cursor-pointer"
            onClick={() => navigate(paths.index)}
          />
        </div>
        {mobileScreen ? (
          <div>
            {menuClicked ? (
              <LiaTimesCircle
                className="absolute top-4 right-10 h-10 w-10 hover:cursor-pointer"
                onClick={() => setMenuClicked(false)}
              />
            ) : (
              <FaBars
                className="w-7 h-7 hover:cursor-pointer"
                onClick={() => setMenuClicked(true)}
              />
            )}
          </div>
        ) : (
          <nav className="flex gap-x-16 items-center">
            <ul className="flex gap-x-10 font-semibold">
              {navLink.map((link, index) => (
                <li
                  className="hover:cursor-pointer"
                  key={index}
                  onClick={() => {
                    if (link.icon) {
                      setDropdown(!dropdown);
                    } else {
                      navigate(paths[link.path]);
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div>{link.name}</div>
                    <div>{link.icon && (dropdown ? <FaAngleUp /> : <FaAngleDown />)}</div>
                  </div>
                  {link.icon && dropdown && (
                    <ul className="absolute top-full left-100 bg-white rounded-md shadow-lg">
                      {link.dropdown &&
                        link.dropdown.map((link, index) => (
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
            {userState.userInfo ? (
              <div className="relative" onClick={() => setShowLogout(!showLogout)}>
                <div className="flex items-center gap-x-1">
                  <img src={images.PostProfileImage} alt="Profile" />
                  {showLogout ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {showLogout && (
                  <ul className="absolute text-sm w-[300px] bg-background2 text-center text-primary flex flex-col gap-4 p-4 rounded-lg mt-2 right-0">
                    <p className="text-left mb-4 font-bold italic">
                      Welcome {userState.userInfo?.name}
                    </p>
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
            ) : (
              <button className={buttonStyle} onClick={() => navigate(paths.login)}>
                Sign In
              </button>
            )}
          </nav>
        )}
      </header>
      {menuClicked && (
        <MobileNavbar setMenuClicked={setMenuClicked} navLink={navLink} buttonStyle={buttonStyle} />
      )}
    </section>
  );
};

export default Navbar;
