import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import themeReducer from './themeSlice';
import postReducer from './postSlice';

export const store = configureStore({
    reducer:{
        user:userReducer,
        theme: themeReducer,
        post:postReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;