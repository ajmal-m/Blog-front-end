import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
    reducer:{
        user:userReducer,
        theme: themeReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;