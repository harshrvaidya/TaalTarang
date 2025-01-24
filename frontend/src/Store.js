import { configureStore } from '@reduxjs/toolkit';
import mylogin from './Features/Login/Loginslice'

const store = configureStore({
  reducer: {
    login: mylogin, // Login reducer handles the state related to login
  },
});

export default store;
