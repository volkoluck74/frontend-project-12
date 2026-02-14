import { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels, selectAllChannels } from '../slices/channelSlice.jsx'
import { openChannelAddingDialog } from '../slices/UIslice.jsx'
import ItemChannel from './ItemChannel.jsx'
import ItemChannelWithMenu from './ItemChannelWithMenu.jsx'
import NewChannelDialog from './NewChannelDialog.jsx'
import ItemMessage from './ItemMessage.jsx'
import ChatForm from './ChatForm.jsx'
import RemovingChannelDialog from './RemovingChannelDialog.jsx'
import RenamingChannelDialog from './RenameChannelDialog.jsx'
import { io } from 'socket.io-client'
import { getMessages, selectAllMessages } from '../slices/messageSlice.jsx'
import Header from './Header.jsx'
import { useTranslation } from 'react-i18next'
import useToast from '../hooks/useToast.js'

const ChatPage = () => {
  const { t } = useTranslation('all')
  const messagesEndRef = useRef(null)
  const messagesContainerRef = useRef(null)
  const dispatch = useDispatch()
  const channels = useSelector(selectAllChannels)
  const messages = useSelector(selectAllMessages)
  const { isAddingChannelDialogOpen,
    currentChannelId,
    isRemovingChannelDialogOpen,
    isRenamingChannelDialogOpen } = useSelector((state) => state.uiState)
  const { showError } = useToast()
  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current
      messagesContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      })
    }
  }, [])
  let currentChannel = channels.length > 0 ? channels.find((item) => item.id === currentChannelId) : {}
  useEffect(() => {
    scrollToBottom()
  }, [messages, currentChannelId])
  useEffect(() => {
    dispatch(getMessages())
    dispatch(getChannels())
  }, [dispatch])
  useEffect(() => {
    const socket = io()
    socket.on('newMessage', async () => {
      try {
        await dispatch(getMessages()).unwrap()
      } catch (e) {
        showError(t('Toast.Error_loaded'))
        throw e
      }
    })
    socket.on('newChannel', async () => {
      try {
        await dispatch(getChannels()).unwrap()
      } catch (e) {
        showError(t('Toast.Error_loaded'))
        throw e
      }
    })
    socket.on('removeChannel', async () => {
      try {
        await dispatch(getChannels()).unwrap()
      } catch (e) {
        showError(t('Toast.Error_loaded'))
        throw e
      }
    })
    socket.on('renameChannel', async () => {
      try {
        await dispatch(getChannels()).unwrap()
      } catch (e) {
        showError(t('Toast.Error_loaded'))
        throw e
      }
    })
    return () => {
      socket.disconnect()
    }
  }, [dispatch])

  const addNewChannel = () => {
    dispatch(openChannelAddingDialog())
  }
  return (
    <>
      <div className="h-100">
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <Header />
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
              <div className="row h-100 bg-white flex-md-row">
                <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                  <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                    <b>{t('Channel.Channels')}</b>
                    <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={addNewChannel}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                      </svg>
                      <span className="visually-hidden">{t('Add_symbol')}</span>
                    </button>
                  </div>
                  <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                    {channels.map((item) => !item.removable
                      ? <ItemChannel key={item.id} item={item} />
                      : <ItemChannelWithMenu key={item.id} item={item} />,
                    )}
                  </ul>
                </div>
                <div className="col p-0 h-100">
                  <div className="d-flex flex-column h-100">
                    <div className="bg-light mb-4 p-3 shadow-sm small">
                      {currentChannel?.name !== undefined
                        ? (
                          <p className="m-0">
                            <b>
                              {t('Channel.Separator')}
                              {' '}
                              {currentChannel.name}
                            </b>
                          </p>
                        )
                        : <p className="m-0"><b>{t('Channel.Separator')}</b></p>}
                      <span className="text-muted">
                        {t('Message', { count: messages.filter((item) => item.channelId === currentChannelId).length })}
                      </span>
                    </div>
                    <div id="messages-box" className="chat-messages overflow-auto px-5 " ref={messagesContainerRef}>
                      {messages.filter((item) => item.channelId === currentChannelId).map((item) =>
                        <ItemMessage key={item.id} item={item} />,
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                    <div className="mt-auto px-5 py-3">
                      <ChatForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Toastify"></div>
          </div>
        </div>
      </div>
      {(isAddingChannelDialogOpen || isRemovingChannelDialogOpen || isRenamingChannelDialogOpen) && <div className="fade modal-backdrop show"></div>}
      {isAddingChannelDialogOpen && <NewChannelDialog />}
      {isRemovingChannelDialogOpen && <RemovingChannelDialog />}
      {isRenamingChannelDialogOpen && <RenamingChannelDialog />}
    </>
  )
}

export default ChatPage
