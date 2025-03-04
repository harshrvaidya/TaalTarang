import { configureStore } from '@reduxjs/toolkit';
import mylogin from './Features/Login/Loginslice'
import cartReducer from './Features/Shop/Shopslice'
const store = configureStore({
  reducer: {
    login: mylogin, 
    cart: cartReducer,// Login reducer handles the state related to login
  },
});

export default store;
