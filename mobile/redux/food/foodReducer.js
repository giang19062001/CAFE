import { createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
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


  },
  extraReducers: (builder) => {
  },
});
export const { addCart, removeCart, clearCart } =foodSlice.actions;
export const selectCart = state => state.food.cart;

export default foodSlice.reducer;
