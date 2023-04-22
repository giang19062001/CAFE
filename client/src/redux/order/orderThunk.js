import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/url';

export const postOrder = createAsyncThunk(
    'post/order',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await api.post(`/api/order`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  
export const  updateOrder = createAsyncThunk(
  'update/order',
  async (data,{rejectWithValue}) => {
      try {
        
        const response = await api.put(`/api/order/${data.id}`,data)
        return response.data
      } catch (err) {
        return rejectWithValue(err.message);
      }
    }
);

  export const fetchOrder = createAsyncThunk(
    'fetch/order',
    async (data,{rejectWithValue}) => {
        try {
 
          const response = await api.get(`/api/order`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  
  export const fetchOrderRevenue = createAsyncThunk(
    'fetch/order/revenue',
    async (data,{rejectWithValue}) => {
        try {
 
          const response = await api.get(`/api/order/revenue/${data}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );