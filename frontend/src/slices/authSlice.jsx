import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import routes from './../routes.js';
import axios from 'axios';


export const login = createAsyncThunk(
  'auth/login',
  async (body, { rejectWithValue }) => {
    try {
      const data = await axios.post(routes.loginPath(), body);
      const token = data.data.token;
      const username = data.data.username;
      return {token, username};
    }
    catch (e) {
      console.log('Проверь Rollbar');
      return rejectWithValue(
        e.status === 401 ? 'Неверные имя пользователя или пароль' : 'Ошибка входа',
      );
    }
  },
);
export const registration = createAsyncThunk(
  'auth/registration',
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.newUserPath(), newUser);
      return response.data;
    }
    catch (e) {
      console.log('Проверь Rollbar');
      return rejectWithValue(
        e.status === 409 ? 'Такой пользователь уже существует' : 'Ошибка регистрации',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: null,
    token: null,
    status: 'idle',
    error: null,
  },
  reducers:{
    logout: (state) => {
      state.username = null;
      state.token = null;
      localStorage.removeItem('userId');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) =>{
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.username = action.payload.username;
        localStorage.setItem('userId', JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registration.pending, (state) =>{
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registration.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registration.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;