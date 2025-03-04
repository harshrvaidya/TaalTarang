// import { createSlice } from '@reduxjs/toolkit';

// // Initial state
// const initialState = [];

// // Creating Redux Slice
// export const shopSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     Add: (state, action) => {
//       state.push(action.payload);
//     },
//     Remove: (state, action) => {
//       return state.filter((p) => p._id.toString() !== action.payload);
//     },
//     Increase: (state, action) => {
//       const IndexI = state.findIndex((p) => p.id === action.payload);
//       if (IndexI !== -1) {
//         state[IndexI].quantity += 1;
//       }
//     },
//     Decrease: (state, action) => {
//       const IndexD = state.findIndex((p) => p.id === action.payload);
//       if (IndexD !== -1 && state[IndexD].quantity > 1) {
//         state[IndexD].quantity -= 1;
//       }
//     },
//   },
// });

// // Export actions
// export const { Add, Remove, Increase, Decrease } = shopSlice.actions;

// // Export reducer
// export default shopSlice.reducer;
