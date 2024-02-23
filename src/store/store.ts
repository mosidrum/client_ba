import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userReducers';

const userInfoString = localStorage.getItem('userInfo');
const userInfoFromLocalStorage = userInfoString !== null ? JSON.parse(userInfoString) : null;

const initialState = {
  user: { userInfo: userInfoFromLocalStorage }
};

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: initialState
});
