import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedin: false,
  myname: "",
  myprofilepic: "",
  myUserid: "" // Add user ID to the state
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    Usersetup: (state, action) => {
      console.log(action.payload);
      const { username, profilePic, userId } = action.payload; // Include userId in the payload
      state.loggedin = true;
      state.myname = username;
      state.myprofilepic = profilePic;
      state.myUserid = userId; // Store user ID in the state
    },
  },
});

// Action creators are generated for each case reducer function
export const { Usersetup } = loginSlice.actions;

export default loginSlice.reducer;