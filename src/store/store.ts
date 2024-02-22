import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userReducers';

const userInfoFromLocalStorage = localStorage.getItem('userInfo') || '';

const initialState = {
  user: { userInfo: userInfoFromLocalStorage }
};

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: initialState
});
