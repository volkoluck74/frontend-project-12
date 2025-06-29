import {createSlice, createAsyncThunk} from `@reduxjs/toolkit`
import routes from './../routes.js'
import axios from 'axios'

export const login = createAsyncThunk(
    'autn/login',
    async (body) => {
        try {
            const data = await axios.post(routes.loginPath(), body);
            const token = data.data.token;
            return token;
        }
        catch {
            console.log('Error auth')
        }
    }
)

const autnSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        status: 'idle',
        error: null
    },
    reducers:{
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) =>{
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.token = action.payload
                localStorage.setItem('token', JSON.stringify(action.payload));
                //localStorage.setItem('token', action.payload)
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { logout } = autnSlice.actions
export default autnSlice.reducer