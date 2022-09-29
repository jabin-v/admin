import {configureStore} from '@reduxjs/toolkit';
import {apiSlice} from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import statsReducer from '../features/stats/statsApiSlice';
import chatsReducer from "../features/chat/chatSlice"
import { setupListeners } from '@reduxjs/toolkit/dist/query';



export const store=configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth:authReducer,
        stats:statsReducer,
        chats:chatsReducer
    },
    middleware:getDefaultMiddleware=>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})


setupListeners(store.dispatch)
