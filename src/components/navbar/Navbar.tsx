import { FaBlog, FaBars, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { LiaTimesCircle } from 'react-icons/lia';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@routes/paths';
import { onMobileScreen } from '@hooks/onMobileScreen';
import { NavLink } from 'customTypes';
import { MobileNavbar } from '@components/navbar';
import { buttonStyle } from '@constants/styles';

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
    name: 'FAQ',
    path: 'faq'
  }
];

const Navbar = () => {
  const navigate = useNavigate();
  const mobileScreen = onMobileScreen('(max-width: 768px)');
  const [menuClicked, setMenuClicked] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);

  return (
    <section>
      <header className="w-full mx-auto py-4 px-5 sm:px-5 lg:px-14 flex justify-between gap-10 items-center shadow-2xl fixed top-0 z-10 bg-background2">
        <div>
          <FaBlog className="w-10 h-10" />
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
            <button className={buttonStyle}>Sign In</button>
          </nav>
        )}
      </header>
      {menuClicked && <MobileNavbar navLink={navLink} buttonStyle={buttonStyle} />}
    </section>
  );
};

export default Navbar;
