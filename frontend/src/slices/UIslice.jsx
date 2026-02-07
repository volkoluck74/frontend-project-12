import { createSlice } from '@reduxjs/toolkit'
//import routes from './../routes.js'
//import axios from 'axios'


const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        channelChangeError: '',
        currentChannelId : '1',
        currentRemoveChannelId: 0,
        curentRenameChannelId: 0,
        addingChannel: false,
        removingChannel: false,
        renamingChannel: false,
        numberChannelWithMenu: 0,
    },
    reducers:{
        setChannelChangeError: (state, action) => {
            state.channelChangeError = action.payload.error
        },
        changeCurrentChannel: (state, action) => {
            state.currentChannelId = action.payload.id
        },
        changeCurrentRemoveChannel: (state, action) => {
            state.currentRemoveChannelId = action.payload.id
        },
        changeCurentRenameChannel: (state, action) => {
            state.curentRenameChannelId = action.payload.id
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
        openRemovingChannelDialog: (state) => {
            state.removingChannel = true
        },
        closeRemovingChannelDialog: (state) => {
            state.removingChannel = false
        },
        openRenamingChannelDialog: (state) => {
            state.renamingChannel = true
        },
        closeRenamingChannelDialog: (state) => {
            state.renamingChannel = false
        },
        
    },
})

export const { openChannelDialog,  closeChannelDialog, changeChannelWithMenu, changeCurrentRemoveChannel, 
            changeCurrentChannel, openRemovingChannelDialog, closeRemovingChannelDialog, 
            changeCurentRenameChannel, openRenamingChannelDialog, closeRenamingChannelDialog, setChannelChangeError}  = uiSlice.actions
export default uiSlice.reducer