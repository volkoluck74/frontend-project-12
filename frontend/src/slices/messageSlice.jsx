
import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import routes from './../routes.js'
import axios from 'axios'
import getAuthHeader from './../utils/getAuthHeader.js'
import {removeChannel} from './channelSlice.jsx'

export const getMessages = createAsyncThunk(
    'message/getMessages',
    async () => {
        const token = getAuthHeader()
        try {
            const response = await axios.get(routes.messagesPath(), {
                headers: token,
            });
            return response.data
        }
        catch {
            console.log('Error get messages')
        }
    }
)

export const postMessage = createAsyncThunk(
    'message/postMessage',
    async (newMessage) => {
    const token = getAuthHeader()
        try {
            const response = await axios.post(routes.messagesPath(), newMessage, {
                headers: token,
            })
        }
        catch {
            console.log('Error post messages')
        }
    }
)


const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) =>{
                state.status = 'loading';
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.messages = action.payload
            })
            .addCase(getMessages.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postMessage.pending, (state) =>{
                console.log(state)
                state.status = 'loading';
            })
            .addCase(postMessage.fulfilled, (state) => {
                console.log(state)
                state.status = 'succeeded'
            })
            .addCase(postMessage.rejected, (state, action) => {
                console.log(state)
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default messagesSlice.reducer
