import {configureStore} from "@reduxjs/toolkit";
import userReducer from './userSlice';
import themeReducer from './themeSlice';
import postReducer from './postSlice';
import commentReucer from './commentSlice';

export const store = configureStore({
    reducer:{
        user:userReducer,
        theme: themeReducer,
        post:postReducer,
        comment:commentReucer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;