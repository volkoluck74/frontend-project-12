import React from 'react'
import { useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import chatSlice, {getChannels, getMessages} from "../slices/chatSlice.jsx"
import {logout} from "../slices/authSlice.jsx"
import ItemChannel from "./itemChannel.jsx"
import ItemMessage from "./itemMessage.jsx"
import ChatForm from "./ChatForm.jsx"
import getAuthHeader from './../utils/getAuthHeader.js'
import {io} from 'socket.io-client'

const ChatPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {channels} = useSelector(state => state.chats)
    const {messages} = useSelector(state => state.chats)
    
    const socket = io();
    const {currentChannelId} = useSelector(state => state.chats)
    const {status} = useSelector(state => state.chats)
    let currentChannel = channels.length > 0 ? channels.filter(item => item.id === currentChannelId)[0] : {}
    const token = getAuthHeader()

    useEffect(() => {
      dispatch(getMessages())
      dispatch(getChannels())
    }, []);
    useEffect(() => {
      socket.on('newMessage', (payload) => {
          dispatch(getMessages())
        })
      socket.on('newChannel', (payload) => {
          console.log(payload) 
        });
  }, );
    const onSubmitLogout =  async (e) => {
      e.preventDefault();
      try {
        await dispatch(logout())
        navigate('/login')
      }
      catch {
        navigate('/')
      }
    }
    const addNewChanel = () => {
      
    }
    return (
    <>
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">Hexlet Chat</a>
              <button type="button" className="btn btn-primary" onClick={onSubmitLogout}>Выйти</button>
            </div>
          </nav>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <button type="button" class="p-0 text-primary btn btn-group-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                  </svg>
                  <span className="visually-hidden">+</span>
                </button>
              </div>
              <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map(item => <ItemChannel item={item}/>)} 
              </ul>
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  {currentChannel?.name !== undefined ? <p className="m-0"><b># {currentChannel.name}</b></p> : <p className="m-0"><b>#</b></p>}
                  <span className="text-muted">{messages.filter(item => item.channelId === currentChannelId).length} сообщений</span>
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                {messages.filter(item => item.channelId === currentChannelId).map(item => <ItemMessage item={item}/>)} 
                </div>
                <div className="mt-auto px-5 py-3">
                  <ChatForm/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Toastify"></div>
    </div>
    </>
  );
}

export default ChatPage