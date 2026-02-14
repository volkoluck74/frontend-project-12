import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import routes from './../routes.js';
import axios from 'axios';
import getAuthHeader from './../utils/getAuthHeader.js';
import { removeChannel } from './channelSlice.jsx';

const messagesAdapter = createEntityAdapter({
  selectId: (message) => message.id,
});

export const getMessages = createAsyncThunk(
  'message/getMessages',
  async() => {
    const token = getAuthHeader();
    try {
      const response = await axios.get(routes.messagesPath(), {
        headers: token,
      });
      return response.data;
    } catch (e) {
      console.log('Проверь Rollbar');
      throw new Error(e);
    }
  },
);

export const postMessage = createAsyncThunk(
  'message/postMessage',
  async(newMessage) => {
    const token = getAuthHeader();
    try {
      const response = await axios.post(routes.messagesPath(), newMessage, {
        headers: token,
      });
      return response.data;
    } catch (e) {
      console.log('Проверь Rollbar');
      throw new Error(e);
    }
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({
    status: 'idle',
    error: null,
  }),
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        messagesAdapter.setAll(state, action.payload);
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          messagesAdapter.addOne(state, action.payload);
        }
      })
      .addCase(postMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(removeChannel.fulfilled, (state, action) => {
        const removedChannelId = action.payload.id;
        if (removedChannelId) {
          const allMessages = Object.values(state.entities);
          const filteredMessages = allMessages.filter(
            message => message.channelId !== removedChannelId,
          );

          messagesAdapter.setAll(state, filteredMessages);
        }
      });
  },
});

export const {
  selectAll: selectAllMessages,
  selectById: selectMessageById,
  selectIds: selectMessageIds,
  selectEntities: selectMessageEntities,
  selectTotal: selectTotalMessages,
} = messagesAdapter.getSelectors(state => state.messages);

export const selectMessagesStatus = (state) => state.messages.status;

export default messagesSlice.reducer;
