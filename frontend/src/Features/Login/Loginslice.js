import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedin:false,
  myname:" ",
  myprofilepic:""
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    Usersetup: (state,action) => {
        console.log(action.payload);
        const { username, profilePic } = action.payload; // Use the same keys here
        state.loggedin = true;
        state.myname = username;
        state.myprofilepic = profilePic;
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { Usersetup} = loginSlice.actions

export default loginSlice.reducer