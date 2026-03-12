import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  delete: false,
  order: false,
  adding: false,
};
const popupSlice = createSlice({
  name: "productPopup",
  initialState,
  reducers: {
    openEditPopup(state, action) {
      state.sEdit = action.payload ?? true;
    },
    closeEditPopup(state) {
      state.sEdit = false;
    },
    openDeletePopup(state, action) {
      state.delete = action.payload ?? true;
    },
    closeDeletePopup(state) {
      state.delete = false;
    },
    openOrderPopup(state, action) {
      state.order = action.payload ?? true;
    },
    closeOrderPopup(state) {
      state.order = false;
    },
    openAddingPopup(state, action) {
      state.adding = action.payload ?? true;
    },
    closeAddingPopup(state) {
      state.adding = false;
    },
  },
});

export const {
  deletePopup,
  openOrderPopup,
  closeDeletePopup,
  closeOrderPopup,
  openDeletePopup,
  closeAddingPopup,
  openAddingPopup,
  closeEditPopup,
  openEditPopup,
} = popupSlice.actions;
export default popupSlice.reducer;
