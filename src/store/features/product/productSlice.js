import { createSlice } from "@reduxjs/toolkit";
import {
  fetchData,
  postData,
  editData,
  deleteData,
  fetchSingleProduct,
} from "./productThunk";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  products: [],
  singleProduct: {},
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH ALL PRODUCTS
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Unable to fetch products ❗️");
      })

      // FETCH SINGLE PRODUCT
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Unable to fetch singleProduct ❗️");
      })

      // ADD PRODUCT
      .addCase(postData.pending, (state) => {
        state.loading = true;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        toast.success("Product added successfully ✅");
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Unable to add product ❗️");
      })

      // EDIT PRODUCT
      .addCase(editData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        );
        toast.success("Product updated successfully ✅");
      })
      .addCase(editData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Unable to update product ❗️");
      })

      // DELETE PRODUCT
      .addCase(deleteData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (item) => item.id !== action.payload,
        );
        toast.success("Product deleted successfully 🗑");
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Unable to delete product ❗️");
      });
  },
});

export default productSlice.reducer;
