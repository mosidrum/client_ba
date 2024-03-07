import { paths } from '@routes/paths';
import React, { useState } from 'react';
import { VscClose, VscThreeBars } from 'react-icons/vsc';
import { RiAdminFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useWindowSize } from '@uidotdev/usehooks';

type Props = {};

const AdminHeader = (props: Props) => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <div className="flex h-fit w-full items-center justify-between p-4">
      <div onClick={() => navigate(paths.index)}>
        <RiAdminFill className="w-12 h-12" />
      </div>
      <div className="cursor-pointer">
        {isMenuClicked ? (
          <VscClose className="h-10 w-10" onClick={toggleMenu} />
        ) : (
          <VscThreeBars className="w-10 h-10" onClick={toggleMenu} />
        )}
      </div>
      <Sidebar toggleMenu={toggleMenu} isMenuClicked={isMenuClicked} />
    </div>
  );
};

export default AdminHeader;
