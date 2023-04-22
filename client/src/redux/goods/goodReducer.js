import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { createGood, fetchGood, updateGood } from "./goodThunk";


const initialState = {
    isLoading: false,
    error: "",
    success: false,
    cart: []
  };
  export const goodSlice = createSlice({
    name: "good",
    initialState,
    reducers: {
      turnOfSuccess: (state, action) => {
          state.success = false;
        },
        
    addCart: (state, action) => {

      const checkExists = state.cart?.find(
        (item) => item._id === action.payload._id
      );
      if (checkExists === undefined) {
        state.cart?.push(action.payload);
      } else {
        const cart = state.cart.map((item) =>
          item._id === action.payload._id
            ? {
                ...item,
                quantity:
                  parseInt(item.quantity) + parseInt(action.payload.quantity),
              }
            : { ...item }
        );

        state.cart = cart;

      }
    },
    removeCart: (state, action) => {
      state.cart = [
        ...state.cart.filter((item) => item._id !== action.payload),
      ];
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createGood.fulfilled, (state, action) => {
          state.isLoading = false;
          state.success = true
        })
        .addMatcher(
            isAnyOf(fetchGood.fulfilled,updateGood.fulfilled),
            (state, action) => {
              state.isLoading = true;
            }
          )
        .addMatcher(
          isAnyOf(createGood.pending,fetchGood.pending,updateGood.pending),
          (state, action) => {
            state.isLoading = true;
          }
        )
        .addMatcher(
          isAnyOf(createGood.rejected,fetchGood.rejected,updateGood.rejected),
          (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          }
        );
  
      builder.addDefaultCase((state, action) => {});
    },
  });
  export const {turnOfSuccess,addCart,removeCart,clearCart } = goodSlice.actions;
  
  export default goodSlice.reducer;  