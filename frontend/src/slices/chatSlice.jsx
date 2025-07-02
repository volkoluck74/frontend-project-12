import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import routes from './../routes.js'
import axios from 'axios'
import getAuthHeader from './../utils/getAuthHeader.js'


export const getChannels = createAsyncThunk(
    'chat/getChannels',
    async () => {
        const token = getAuthHeader()
        try {
            const response = await axios.get(routes.channelsPath(), {
                headers: token,
            });
            return response.data
        }
        catch {
            console.log('Error get channels')
        }
    }
)
export const getMessages = createAsyncThunk(
    'chat/getMessages',
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
    'chat/postMessage',
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

export const postChannel = createAsyncThunk(
    'chat/postChannel',
    async (newChannel) => {
    const token = getAuthHeader()
        try {
            const response = await axios.post(routes.channelsPath(), newChannel, {
                headers: token,
            })
        }
        catch {
            console.log('Error post channel')
        }
    }
)

const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        channels: [],
        messages: [],
        currentChannelId : '1',
        status: 'idle',
        error: null
    },
    reducers:{
        changeCurrentChannel: (state, action) => {
            state.currentChannelId = action.payload.id
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChannels.pending, (state) =>{
                state.status = 'loading';
            })
            .addCase(getChannels.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.channels = action.payload
            })
            .addCase(getChannels.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
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
            .addCase(postChannel.pending, (state) =>{
                console.log(state)
                state.status = 'loading';
            })
            .addCase(postChannel.fulfilled, (state) => {
                console.log(state)
                state.status = 'succeeded'
            })
            .addCase(postChannel.rejected, (state, action) => {
                console.log(state)
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { changeCurrentChannel } = chatsSlice.actions
export default chatsSlice.reducer