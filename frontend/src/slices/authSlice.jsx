import {createSlice, createAsyncThunk} from `@reduxjs/toolkit`
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
            state.username = null;
            state.token = null;
            localStorage.setItem('token', null);
            localStorage.setItem('username', null);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) =>{
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload.token,
                state.username = action.payload.username,
                localStorage.setItem('token', JSON.stringify(action.payload.token));
                localStorage.setItem('username', JSON.stringify(action.payload.username));
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { logout } = autnSlice.actions
export default autnSlice.reducer