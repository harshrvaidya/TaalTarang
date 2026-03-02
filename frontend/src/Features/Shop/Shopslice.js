import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = [];

export const shopSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    Add: (state, action) => {
      const existingItem = state.find((p) => p._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if item already exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },
    Remove: (state, action) => {
      return state.filter((p) => p._id !== action.payload); // Fixed ID usage
    },
    Increase: (state, action) => {
      const item = state.find((p) => p._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    Decrease: (state, action) => {
      const item = state.find((p) => p._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

// Export actions
export const { Add, Remove, Increase, Decrease } = shopSlice.actions;

// Export reducer
export default shopSlice.reducer;
