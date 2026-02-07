import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import routes from './../routes.js'
import axios from 'axios'
import getAuthHeader from './../utils/getAuthHeader.js'


export const getChannels = createAsyncThunk(
    'channels/getChannels',
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
    'channels/postChannel',
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

export const editChannel = createAsyncThunk(
    'channels/editChannel',
    async ({newNameChannel, id}) => {
    const changes = {name: newNameChannel}
    const token = getAuthHeader()
        try {
            const response = await axios.patch(routes.channelsPathWithId(id), changes, {
               headers: token,
            })
            return response.data
        }
        catch {
            console.log('Error edit channel')
        }
    }
)

export const removeChannel = createAsyncThunk(
    'channels/removeChannel',
    async (id) => {
    const token = getAuthHeader()
        try {
            const response = await axios.delete(routes.channelsPathWithId(id), {
                headers: token,
            })
            console.log(response.data);
            console.log(routes.channelsPathWithId(id))
            return response.data
        }
        catch {
            console.log('Error remove channel')
        }
    }
)

const channelsSlice = createSlice({
    name: 'channels',
    initialState: {
        channels: [],
        status: 'idle',
        error: null
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
            .addCase(editChannel.pending, (state) =>{
                console.log(state)
                state.status = 'loading';
            })
            .addCase(editChannel.fulfilled, (state) => {
                console.log(state)
                state.status = 'succeeded'
            })
            .addCase(editChannel.rejected, (state, action) => {
                console.log(state)
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(removeChannel.pending, (state) =>{
                console.log(state)
                state.status = 'loading';
            })
            .addCase(removeChannel.fulfilled, (state) => {
                console.log(state)
                state.status = 'succeeded'
            })
            .addCase(removeChannel.rejected, (state, action) => {
                console.log(state)
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default channelsSlice.reducer