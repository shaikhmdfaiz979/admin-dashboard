import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import popupReducer from "./features/popup/popupSlice";
import productReducer from "./features/product/productSlice"
import orderReducer from "./features/order/orderSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    popup: popupReducer,
    product: productReducer,
    order:orderReducer,
  },
});
