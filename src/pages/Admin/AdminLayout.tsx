import React, { useEffect, useState } from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getAdmin } from '@services/users';
import { LoggedInUser } from '@customTypes/Types';
import {paths} from "@routes/paths";
import {RiAdminFill} from "react-icons/ri";
import {VscClose, VscThreeBars} from "react-icons/vsc";
import Sidebar from "@pages/Admin/Sidebar";
import {useWindowSize} from "@uidotdev/usehooks";

const AdminLayout = () => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const largeScreen = windowSize.width && windowSize.width > 768;
  const userState = useSelector((state: any) => state.user);
  const [adminData, setAdminData] = useState<LoggedInUser | null>(null); // Use null for initial state

  useEffect(() => {
    if (largeScreen) {
      setIsMenuClicked(true);
    } else {
      setIsMenuClicked(false);
    }
    const fetchData = async () => {
      const token = userState.userInfo.token;
      const data: LoggedInUser = await getAdmin(token, params.id);
      setAdminData(data);
    };
    fetchData();
  }, [params.id, largeScreen]);

  const toggleMenu = () => {
    setIsMenuClicked(!isMenuClicked);
  };


  return (
    <div className="md:grid md:grid-cols-3">
      <div className="flex h-fit w-full items-center justify-between p-4">
        <div onClick={() => navigate(paths.index)}>
          <RiAdminFill className="w-12 h-12" />
        </div>
        {largeScreen ? (
            <></>
        ) : (
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
      <div className=" -ml-0 md:col-span-2 md:-ml-5 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
