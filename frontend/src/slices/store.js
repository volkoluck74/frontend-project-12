import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice.jsx'
import chatsSlice from './chatSlice.jsx'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        chats: chatsSlice,
    }
})