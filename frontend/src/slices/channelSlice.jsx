import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

export const postChannel = createAsyncThunk(
    'chat/postChannel',
    async (newChannel) => {
    const token = getAuthHeader()
        try {
            const response = await axios.post(routes.channelsPath(), newChannel, {
                headers: token,
            })
            return response.data
        }
        catch {
            console.log('Error post channel')
        }
    }
)

const channelsSlice = createSlice({
    name: 'channels',
    initialState: {
        channels: [],
        //currentChannelId : '1',
        errorAddingNewChannel: '',
        status: 'idle',
        error: null
    },
    reducers:{
        /*
        changeCurrentChannel: (state, action) => {
            state.currentChannelId = action.payload.id
        },
        */
        setErrorAddingNewChannel: (state, action) => {
            state.errorAddingNewChannel = action.payload.error
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

export const { /*changeCurrentChannel, */ setErrorAddingNewChannel} = channelsSlice.actions
export default channelsSlice.reducer