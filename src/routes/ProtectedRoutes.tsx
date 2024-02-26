import { logout } from '@store/userActions';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { paths } from './paths';

export const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const userState = useSelector((state: any) => state.user);
  const logoutAction = logout();

  useEffect(() => {
    const token = userState?.userInfo?.token;
    if (!token) {
      logoutAction;
      navigate(paths.index);
    }
  }, [userState, logoutAction, navigate]);

  return <Outlet />;
};
