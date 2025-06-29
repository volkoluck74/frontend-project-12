import {createSlice, createAsyncThunk} from `@reduxjs/toolkit`
import routes from './../routes.js'
import axios from 'axios'
import { current } from '@reduxjs/toolkit';


export const getChats = createAsyncThunk(
    'chat/getChats',
    async (token) => {
        try {
            const response = await axios.get(routes.usersPath(), {
                headers: token,
            });
            console.log(response.data)
            return response.data
        }
        catch {
            console.log('Error get chats')
        }
    }
)

const chatsSlice = createSlice({
    name: 'chats',
    initialState: {
        channels: [],
        messages: [],
        currentChannelId : 0,
        status: 'idle',
        error: null
    },
    reducers:{
        logout: (state) => {
            state.chanels = [];
            state.messages = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChats.pending, (state) =>{
                state.status = 'loading';
            })
            .addCase(getChats.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.currentChannelId= action.payload.currentChannelId
                state.channels = action.payload.channels
                state.messages = action.payload.messages
            })
            .addCase(getChats.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

//export const { logout } = autnSlice.actions
export default chatsSlice.reducer