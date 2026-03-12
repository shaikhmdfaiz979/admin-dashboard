import { createAsyncThunk } from "@reduxjs/toolkit";
import { mockApi } from "../../../config/api";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockApi.get("/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const postOrder = createAsyncThunk(
  "order/postOrder",
  async (details, { rejectWithValue, dispatch }) => {
    try {
      const response = await mockApi.post("/orders", details);
      dispatch(fetchOrder());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const editOrder = createAsyncThunk(
  "order/editOrder",
  async ({ id, details }, { rejectWithValue, dispatch }) => {
    try {
      const response = await mockApi.put(`/orders/${id}`, details);
      dispatch(fetchOrder());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await mockApi.delete(`/orders/${id}`);
      dispatch(fetchOrder());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
