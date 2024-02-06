import { FaBlog, FaBars } from 'react-icons/fa';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from '@routes/paths';

export interface NavLink {
  name: string;
  path: string;
}

export const navLink: NavLink[] = [
  {
    name: 'Articles',
    path: 'articles'
  },
  {
    name: 'Pages',
    path: 'pages'
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

  return (
    <section>
      <header className="container mx-auto py-4 px-20 flex justify-between items-center">
        <div>
          <FaBlog className="w-10 h-10" />
        </div>
        <nav className="flex gap-x-16 items-center">
          <ul className="flex gap-x-10 font-semibold">
            {navLink.map((link, index) => (
              <li key={index} onClick={() => navigate(paths[link.path])}>
                {link.name}
              </li>
            ))}
          </ul>
          <button className="border-2 text-blue-500 font-semibold border-blue-500 rounded-full py-2 px-6 hover:bg-blue-500 hover:text-white transition-all duration-300">
            Sign In
          </button>
          <FaBars className="hidden" />
        </nav>
      </header>
    </section>
  );
};

export default Navbar;
