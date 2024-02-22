import { userActions } from './userReducers';
import { ThunkDispatch } from '@reduxjs/toolkit';

export const logout = () => (dispatch: ThunkDispatch<any, any, any>) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem('userInfo');
};
