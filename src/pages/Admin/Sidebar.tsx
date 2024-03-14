import { paths } from '@routes/paths';
import React, { SetStateAction, useState } from 'react';
import { RiAdminFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { AiFillDashboard } from 'react-icons/ai';
import { MdAdd, MdOutlineInsertComment, MdOutlineModeEdit, MdOutlinePostAdd } from 'react-icons/md';
import { NavItemCollapse, NavItemLink } from '@components/index';
import { LoggedInUser } from '@customTypes/Types';
import pathToUploadPicture from '@constants/pathToUploadPicture';
import { images } from '@constants/images';

type Props = {
  toggleMenu: () => void;
  isMenuClicked: boolean;
  largeScreen: boolean | number | null;
  setIsMenuClicked: React.Dispatch<SetStateAction<boolean>>;
  adminData: LoggedInUser | null;
};

const menuItems = [
  {
    title: 'Dashboard',
    link: '',
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
        link: `${paths.managepost}`,
        icon: <MdOutlineModeEdit />,
        id: 'managepost'
      }
    ],
    icon: <MdOutlinePostAdd className="text-xl" />,
    id: 'newpost' || 'managepost',
    type: 'collapse'
  }
];

const Sidebar = ({
  toggleMenu,
  isMenuClicked,
  largeScreen,
  setIsMenuClicked,
  adminData
}: Props) => {
  const [activeNavId, setActiveNavId] = useState('dashboard');
  const navigate = useNavigate();

  return (
    <>
      {isMenuClicked && (
        <div className={`fixed ${!largeScreen ? 'z-10' : ''}`}>
          {!largeScreen && (
            <div className="fixed inset-0 bg-background2 opacity-70" onClick={toggleMenu} />
          )}
          <div
            className={`fixed top-0 bottom-0 left-0 z-50 ${largeScreen ? 'w-[30%]' : 'w-4/5'} overflow-y-auto bg-primary p-4 transform transition-transform duration-300 ease-in-out`}
          >
            <div className="flex justify-between items-center">
              <RiAdminFill
                color="white"
                onClick={() => navigate(paths.index)}
                className="w-12 h-12"
              />
              <div className="flex flex-col justify-center items-center">
                <img
                  src={
                    adminData?.avatar
                      ? pathToUploadPicture.UPLOAD_FOLDER_BASE_URL + adminData.avatar
                      : images.noProfileImage
                  }
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
                <div className="text-background2 font-bold">{adminData?.name}</div>
              </div>
            </div>
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
