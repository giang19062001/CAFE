import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { checkUser, createUser, fetchUser, login, updateUser } from "./userThunk";


const initialState = {
    isLoading: false,
    error: "",
    success: false,
    user: null
  };
  export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      turnOfSuccess: (state, action) => {
          state.success = false;
        },
        logOut : (state, action) => {
          state.user = null;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.success = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload
        })
        .addMatcher(
          isAnyOf(fetchUser.fulfilled,updateUser.fulfilled,checkUser.fulfilled),
          (state, action) => {
            state.isLoading = false;
          }
        )
        .addMatcher(
          isAnyOf(createUser.pending, fetchUser.pending, login.pending,updateUser.pending,checkUser.pending),
          (state, action) => {
            state.isLoading = true;
          }
        )
        .addMatcher(
          isAnyOf(createUser.rejected,fetchUser.rejected, login.rejected,updateUser.rejected,checkUser.rejected),
          (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          }
        );
  
      builder.addDefaultCase((state, action) => {});
    },
  });
  export const {turnOfSuccess, logOut } = userSlice.actions;
  
  export default userSlice.reducer;  