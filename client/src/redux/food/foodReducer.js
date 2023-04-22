import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { deleteFood, fetchFoods, postFood, putFood } from "./foodThunk";

const initialState = {
  isLoading: false,
  error: "",
  cart: [],
  success: false,
};

export const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
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
                recipe: item.recipe.map((value, index) => ({
                  _id: value._id,
                  name:value.name,
                  unit: value.unit,
                  quantity: parseInt(value.quantity * ( parseInt(item.quantity) + parseInt(action.payload.quantity)))
                })),
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

    turnOffSuccess: (state, action) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postFood.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addMatcher(
        isAnyOf(fetchFoods.fulfilled, deleteFood.fulfilled, putFood.fulfilled),
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          postFood.pending,
          fetchFoods.pending,
          deleteFood.pending,
          putFood.pending
        ),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          postFood.rejected,
          fetchFoods.rejected,
          deleteFood.rejected,
          putFood.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );

    builder.addDefaultCase((state, action) => {});
  },
});
export const { addCart, removeCart, clearCart, turnOffSuccess } =
  foodSlice.actions;

export default foodSlice.reducer;
