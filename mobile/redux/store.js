import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userReducer';
import foodReducer from './food/foodReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    food: foodReducer
  },
});
