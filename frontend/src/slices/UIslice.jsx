import { createSlice } from '@reduxjs/toolkit'
//import routes from './../routes.js'
//import axios from 'axios'


const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        currentChannelId : '1',
        addingChannel: false,
        numberChannelWithMenu: 0,
    },
    reducers:{
        changeCurrentChannel: (state, action) => {
            state.currentChannelId = action.payload.id
        },
        openChannelDialog: (state) => {
            state.addingChannel = true
        },
        closeChannelDialog: (state) => {
            state.addingChannel = false
        },
        changeChannelWithMenu: (state, action) => {
            state.numberChannelWithMenu = action.payload.id
        },

    },
})

export const { openChannelDialog,  closeChannelDialog, changeChannelWithMenu, changeCurrentChannel} = uiSlice.actions
export default uiSlice.reducer