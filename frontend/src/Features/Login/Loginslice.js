import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedin: false,
  myname: "",
  myprofilepic: "",
  myUserid: "",
  myRole: "", // Add user ID to the state
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    Usersetup: (state, action) => {
      console.log(action.payload);
      const { username, profilePic, userId, role } = action.payload; // Include userId in the payload
      state.loggedin = true;
      state.myname = username;
      state.myprofilepic = profilePic;
      state.myUserid = userId; // Store user ID in the state
      state.myRole = role; 
    },
    logout: (state) => {
      state.loggedin = false;
      state.myname = "";
      state.myprofilepic = "";
      state.myUserid = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { Usersetup, logout  } = loginSlice.actions;

export default loginSlice.reducer;