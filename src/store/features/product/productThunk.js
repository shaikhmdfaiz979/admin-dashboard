import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockApi } from "../../../config/api";

export const fetchData = createAsyncThunk(
  "product/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockApi.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await mockApi.get("/products/" + id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const postData = createAsyncThunk(
  "product/postData",
  async (details, { rejectWithValue, dispatch }) => {
    try {
      const response = await mockApi.post("/products", details);
      dispatch(fetchData());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const editData = createAsyncThunk(
  "product/editData",
  async ({ id, details }, { rejectWithValue, dispatch }) => {
    try {
      const response = await mockApi.put("/products/" + id, details);
      dispatch(fetchData());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteData = createAsyncThunk(
  "product/deleteData",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await mockApi.delete('/products/'+id);
      dispatch(fetchData());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);