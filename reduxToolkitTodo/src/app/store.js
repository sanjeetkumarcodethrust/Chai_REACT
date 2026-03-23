import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/Todoslice"


export const store=configureStore({
    reducer:todoReducer
})
