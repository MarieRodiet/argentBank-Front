import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../features/loginSlice.js';
import { userSlice } from '../features/userSlice.js'


export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    user: userSlice.reducer
  }
});


