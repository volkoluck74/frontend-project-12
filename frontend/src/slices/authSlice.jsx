import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import routes from './../routes.js'
import axios from 'axios'

export const login = createAsyncThunk(
    'autn/login',
    async (body) => {
        try {
            const data = await axios.post(routes.loginPath(), body)
            const token = data.data.token
            const username = data.data.username
            return {token, username}
        }
        catch {
            console.log('Error auth')
        }
    }
)

const autnSlice = createSlice({
    name: 'auth',
    initialState: {
        username: null,
        token: null,
        status: 'idle',
        error: null
    },
    reducers:{
        logout: (state) => {
            state.username = null
            state.token = null
            localStorage.removeItem('userId')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) =>{
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.token
                state.username = action.payload.username
                localStorage.setItem('userId', JSON.stringify(action.payload))
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { logout } = autnSlice.actions
export default autnSlice.reducer