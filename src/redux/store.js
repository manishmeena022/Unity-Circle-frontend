import { configureStore } from "@reduxjs/toolkit";
import authReducer  from "./features/auth/authSlice";

export const store = configureStore({
    reducer : {
        // Add reducers here
        auth : authReducer,
    },
})