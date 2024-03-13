import { logout } from '@store/userActions';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { paths } from './paths';

export const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.user);
  const logoutAction = logout();

  useEffect(() => {
    const token = userState?.userInfo?.token;
    if (!token) {
      dispatch(logout())
      navigate(paths.login);
    }
  }, [userState, logoutAction, navigate]);

  return <Outlet />;
};
