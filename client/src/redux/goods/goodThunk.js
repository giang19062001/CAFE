
import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/url';


export const createGood = createAsyncThunk(
    'create/good',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await api.post(`/api/goods`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const fetchGood = createAsyncThunk(
    'fetch/good',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await api.get(`/api/goods`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const updateGood = createAsyncThunk(
    'update/good',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await api.put(`/api/goods/${data?._id}`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
