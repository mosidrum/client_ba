import { createSlice } from '@reduxjs/toolkit';

const userInitialState = { userInfo: '' };

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetUserInfo(state) {
      state.userInfo = '';
    }
  }
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userReducer, userActions };
