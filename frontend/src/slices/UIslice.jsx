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
        isAddingChannelDialogOpen: false,
        isRemovingChannelDialogOpen: false,
        isRenamingChannelDialogOpen: false,
        channelWithOpenMenuId: 0,
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
        openChannelAddingDialog: (state) => {
            state.isAddingChannelDialogOpen = true
        },
        closeChannelAddingDialog: (state) => {
            state.isAddingChannelDialogOpen = false
        },
        changeChannelWithOpenMenu: (state, action) => {
            state.channelWithOpenMenuId = action.payload.id
        },
        openRemovingChannelDialog: (state) => {
            state.isRemovingChannelDialogOpen = true
        },
        closeRemovingChannelDialog: (state) => {
            state.isRemovingChannelDialogOpen = false
        },
        openRenamingChannelDialog: (state) => {
            state.isRenamingChannelDialogOpen = true
        },
        closeRenamingChannelDialog: (state) => {
            state.isRenamingChannelDialogOpen = false
        },
        
    },
})

export const { openChannelAddingDialog,
                closeChannelAddingDialog, 
                changeChannelWithOpenMenu, 
                changeCurrentRemoveChannel, 
                changeCurrentChannel,
                openRemovingChannelDialog,
                closeRemovingChannelDialog, 
                changeCurentRenameChannel,
                openRenamingChannelDialog,
                closeRenamingChannelDialog,
                setChannelChangeError}  = uiSlice.actions
export default uiSlice.reducer