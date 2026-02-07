import { useDispatch, useSelector } from "react-redux"
import { removeChannel} from "../slices/channelSlice"
import React, { useRef, useEffect } from 'react'

//import axios from 'axios'
//import getAuthHeader from './../utils/getAuthHeader.js'
//import {io} from 'socket.io-client'
import {changeCurrentRemoveChannel, closeRemovingChannelDialog, changeCurrentChannel} from "../slices/UIslice.jsx"


const RemovingChannelDialog = () => {
    const dispatch = useDispatch()
    const {currentRemoveChannelId} = useSelector(state => state.uiState)
    const modalRef = useRef(null)
    const deleteChannel = () => {
        dispatch(removeChannel(currentRemoveChannelId))
        dispatch(closeRemovingChannelDialog())
        dispatch(changeCurrentChannel({id: '1'}))
    }
    const cancelRemovingChannel = () => {
        dispatch(changeCurrentRemoveChannel({id: 0}))
        dispatch(closeRemovingChannelDialog())
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (currentRemoveChannelId !== 0 && 
                modalRef.current && 
                !modalRef.current.contains(event.target)) {
                cancelRemovingChannel()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [currentRemoveChannelId])
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && currentRemoveChannelId !== 0) {
                cancelRemovingChannel()
            }
        }
        document.addEventListener('keydown', handleEscKey)
        return () => {
            document.removeEventListener('keydown', handleEscKey)
        }
    }, [currentRemoveChannelId])


    return (
        <div role="dialog" aria-modal="true" style = {{display: "block"}} className="fade modal show" tabindex="-1">
            <div className="modal-dialog modal-dialog-centered" ref={modalRef}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title h4">Удалить канал</div>
                        <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick = {cancelRemovingChannel}></button>
                    </div>
                    <div className="modal-body">
                        <p className="lead">Уверены?</p>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="me-2 btn btn-secondary" onClick = {cancelRemovingChannel}>Отменить</button>
                            <button type="button" className="btn btn-danger" onClick = {deleteChannel} >Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default RemovingChannelDialog