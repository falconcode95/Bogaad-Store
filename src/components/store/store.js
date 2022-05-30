import { configureStore } from "@reduxjs/toolkit";
import shopSliceReducer from "./secondPageSlice";
import cartSliceReducer from './cart';
import accountSliceReducer from "./accountSlice";

export default configureStore({
    reducer : {
        shop: shopSliceReducer,
        cart: cartSliceReducer,
        account: accountSliceReducer
    }
})