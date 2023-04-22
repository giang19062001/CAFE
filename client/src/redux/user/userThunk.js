
import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/url';


export const createUser = createAsyncThunk(
    'create/user',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await api.post(`/api/user`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const login = createAsyncThunk(
    'login/user',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await api.post(`/api/user/login`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const updateUser = createAsyncThunk(
    'update/user',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await api.put(`/api/user/${data?._id}`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  export const checkUser = createAsyncThunk(
    'check/user',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await api.get(`/api/user/${data}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
  export const fetchUser = createAsyncThunk(
    'fetch/user',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await api.get(`/api/user`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );