import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
};

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    saveUer:  (state, action) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user =null;
    },
  },
  extraReducers: builder => {
  },
});

export const { saveUer, logout } = userSlice.actions;

export const selectUser = state => state.user.user;

export default userSlice.reducer;

