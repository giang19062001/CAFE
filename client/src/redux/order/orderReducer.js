import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchOrder, fetchOrderRevenue, postOrder, updateOrder } from "./orderThunk";

const initialState = {
  isLoading: false,
  error: "",
  success: false
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    turnOfSuccess: (state, action) => {
        state.success = false;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true
      })
      .addMatcher(
        isAnyOf( fetchOrder.fulfilled,updateOrder.fulfilled,fetchOrderRevenue.fulfilled),
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(postOrder.pending, fetchOrder.pending,updateOrder.pending,fetchOrderRevenue.pending),
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(postOrder.rejected,fetchOrder.rejected,updateOrder,fetchOrderRevenue.rejected ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );

    builder.addDefaultCase((state, action) => {});
  },
});
export const {turnOfSuccess } = orderSlice.actions;

export default orderSlice.reducer;