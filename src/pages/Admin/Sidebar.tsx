import { paths } from '@routes/paths';
import React, { SetStateAction, useState } from 'react';
import { RiAdminFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai';
import { MdAdd, MdOutlineInsertComment, MdOutlineModeEdit, MdOutlinePostAdd } from 'react-icons/md';
import { NavItemCollapse, NavItemLink } from '@components/index';

type Props = {
  toggleMenu: () => void;
  isMenuClicked: boolean;
  largeScreen: boolean | number | null;
  setIsMenuClicked: React.Dispatch<SetStateAction<boolean>>;
};

const menuItems = [
  {
    title: 'Dashboard',
    link: paths.admin,
    icon: <AiFillDashboard className="text-xl" />,
    id: 'dashboard',
    type: 'link'
  },
  {
    title: 'Comments',
    link: `${paths.comments}`,
    icon: <MdOutlineInsertComment className="text-xl" />,
    id: 'comments',
    type: 'link'
  },
  {
    title: 'Posts',
    content: [
      {
        title: 'New Post',
        link: `${paths.newpost}`,
        icon: <MdAdd />,
        id: 'newpost'
      },
      {
        title: 'Manage Post',
        link: `${paths.newpost}`,
        icon: <MdOutlineModeEdit />,
        id: 'managepost'
      }
    ],
    icon: <MdOutlinePostAdd className="text-xl" />,
    id: 'newpost' || 'managepost',
    type: 'collapse'
  }
];

const Sidebar = ({ toggleMenu, isMenuClicked, largeScreen, setIsMenuClicked }: Props) => {
  const [activeNavId, setActiveNavId] = useState('dashboard');
  const navigate = useNavigate();
  return (
    <>
      {isMenuClicked && (
        <div className="fixed inset-0">
          {!largeScreen && (
            <div className="fixed inset-0 bg-background2 opacity-70" onClick={toggleMenu} />
          )}
          <div
            className={`fixed top-0 bottom-0 left-0 z-50 ${largeScreen ? 'w-[30%]' : 'w-4/5'} overflow-y-auto bg-primary p-4 transform transition-transform duration-300 ease-in-out`}
          >
            <RiAdminFill
              color="white"
              onClick={() => navigate(paths.index)}
              className="w-12 h-12"
            />
            <h4 className="text-background2 mt-10 font-bold ">Main Menu</h4>
            <div className="mt-6 flex flex-col gap-y-[2px]">
              {menuItems.map((item, index) =>
                item.type === 'link' ? (
                  <NavItemLink
                    key={index}
                    activeNavId={activeNavId}
                    setActiveNavId={setActiveNavId}
                    icon={item.icon}
                    id={item.id}
                    link={item.link || ''}
                    title={item.title}
                    isMenuClicked={isMenuClicked}
                    setIsMenuClicked={setIsMenuClicked}
                    largeScreen={largeScreen}
                  />
                ) : (
                  <NavItemCollapse
                    key={index}
                    activeNavId={activeNavId}
                    setActiveNavId={setActiveNavId}
                    icon={item.icon}
                    id={item.id}
                    content={item.content}
                    title={item.title}
                    isMenuClicked={isMenuClicked}
                    setIsMenuClicked={setIsMenuClicked}
                    largeScreen={largeScreen}
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
