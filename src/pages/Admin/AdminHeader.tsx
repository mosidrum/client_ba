import { paths } from '@routes/paths';
import React, { useEffect, useState } from 'react';
import { VscClose, VscThreeBars } from 'react-icons/vsc';
import { RiAdminFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useWindowSize } from '@uidotdev/usehooks';
import { LoggedInUser } from '@customTypes/Types';

type AdminDataType = {
  adminData: LoggedInUser;
};

const AdminHeader = ({ adminData }: AdminDataType) => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const largeScreen = windowSize.width && windowSize.width > 768;

  const toggleMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  useEffect(() => {
    if (largeScreen) {
      setIsMenuClicked(true);
    } else {
      setIsMenuClicked(false);
    }
  }, [largeScreen]);

  return (
    <div className="flex h-fit w-full items-center justify-between p-4">
      <div onClick={() => navigate(paths.index)}>
        <RiAdminFill className="w-12 h-12" />
      </div>
      {!largeScreen && (
        <div className="cursor-pointer">
          {isMenuClicked ? (
            <VscClose className="h-10 w-10" onClick={toggleMenu} />
          ) : (
            <VscThreeBars className="w-10 h-10" onClick={toggleMenu} />
          )}
        </div>
      )}
      <Sidebar
        toggleMenu={toggleMenu}
        isMenuClicked={isMenuClicked}
        largeScreen={largeScreen}
        setIsMenuClicked={setIsMenuClicked}
        adminData={adminData}
      />
    </div>
  );
};

export default AdminHeader;
