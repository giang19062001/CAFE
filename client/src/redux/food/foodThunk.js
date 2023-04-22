import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/url';

export const fetchFoods = createAsyncThunk(
    'fetch/food',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.get("/api/food", data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
 
  export const postFood = createAsyncThunk(
    'post/food',
    async (data,{rejectWithValue}) => {
        try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          const response = await api.post(`/api/food`,data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const putFood = createAsyncThunk(
    'put/food',
    async (data,{rejectWithValue}) => {
        try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          const response = await api.put(`/api/food/${data._id}`,data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const deleteFood = createAsyncThunk(
    'delete/food',
    async (id,{rejectWithValue}) => {
        try {
        
          const response = await api.put(`/api/food/delete/${id}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

