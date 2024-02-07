import { FaBlog, FaBars, FaAngleDown } from 'react-icons/fa';
import { LiaTimesCircle } from 'react-icons/lia';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@routes/paths';
import { onMobileScreen } from '@hooks/onMobileScreen';

export interface NavLink {
  name: string;
  path: string;
  icon?: boolean;
  dropdown?: NavLink[];
}

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
  const buttonStyle =
    'border-2 text-primary font-semibold border-primary rounded-full py-2 px-6 hover:bg-primary hover:text-white transition-all duration-300';

  return (
    <section>
      <header className="w-full fixed mx-auto py-4 px-10 flex justify-between items-center">
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
                    <div>{link.icon && <FaAngleDown />}</div>
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
      {menuClicked && (
        <div className="fixed bg-background2 text-primary h-full mt-20 w-full p-10 transition-all duration-1000">
          <nav className="flex items-center gap-14 flex-col justify-center m-auto h-3/4">
            <ul className="flex flex-col items-center gap-10">
              {navLink.map((link, index) => (
                <li
                  className="hover:cursor-pointer border-2 border-primary rounded-full py-1 px-8"
                  key={index}
                  onClick={() => {
                    if (link.icon) {
                      setDropdown(true);
                    } else {
                      navigate(paths[link.path]);
                    }
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <div>{link.name}</div>
                    <div>{link.icon && <FaAngleDown />}</div>
                  </div>
                  {link.icon && dropdown && (
                    <ul className="absolute top-full left-0 bg-white rounded-md shadow-lg">
                      {link.dropdown &&
                        link.dropdown.map((link, index) => (
                          <li
                            key={index}
                            onClick={() => navigate(paths[link.path])}
                            className="hover:bg-gray-200 px-4 py-2 cursor-pointer"
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
      )}
    </section>
  );
};

export default Navbar;
