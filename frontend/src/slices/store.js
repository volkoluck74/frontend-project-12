import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice.jsx'
import chatsSlice from './chatSlice.jsx'
import channelsSlice from './channelSlice.jsx'
import uiSlice from './UIslice.jsx'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        channels: channelsSlice,
        chats: chatsSlice,
        uiState: uiSlice,
    }
})