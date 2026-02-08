import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation} from "react-i18next"
//import routes from './../routes.js'
import { useEffect, useRef} from 'react'
//import axios from 'axios'
//import getAuthHeader from './../utils/getAuthHeader.js'
//import {io} from 'socket.io-client'
import {postMessage, selectMessagesStatus} from "../slices/messageSlice.jsx"
import useToast from '../hooks/useToast.js'
import leoProfanity from 'leo-profanity'
const ChatForm = () => {
    const {t} = useTranslation('all')
    const formik = useFormik({
        initialValues: {
            body: '',
        },
    })
    
    useEffect(() => {
        leoProfanity.loadDictionary('ru')
    }, [])
    
    //const socket = io();
    const dispatch = useDispatch()
    const { showError } = useToast()
    //const token = getAuthHeader()
    const { currentChannelId, addingChannel, renamingChannel } = useSelector(state => state.uiState)
    const isAnyModalOpen = addingChannel  || renamingChannel
    const inputEl = useRef(null)
    const status = useSelector(selectMessagesStatus)
    useEffect(() => {
        if (!isAnyModalOpen && inputEl.current) {
            inputEl.current.focus()
        }
    }, [isAnyModalOpen, currentChannelId, status]) 
    
    const onSubmit =  async (e) => {
        e.preventDefault();
        
        
        const newMessage = { 
            body: leoProfanity.clean(formik.values.body), 
            channelId: currentChannelId, 
            username: JSON.parse(localStorage.getItem('userId')).username
        }
        try {

            dispatch(postMessage(newMessage))
            /*
            console.log("New message send")
            const response123 = await axios.get(routes.messagesPath(), {
                headers: token,
            });
            console.log(response123);
            
            const response2 = await axios.post(routes.channelsPath(), newChannel, {
                headers: token,
            })
            console.log(response2)
            
            const response3 = await axios.get(routes.dataPath(), {
                headers: token,
            })
            console.log(response3.data)
            const response4 = await axios.get(routes.channelsPath(), {
                headers: token,
            })
            console.log(response4.data)
            
            //const response2 = await axios.post(routes.newUserPath(), { username: 'newuser', password: 'tttt456'});
            //console.log(response2)
            */
        }
        catch (e) {
            console.log(e)
            showError(t('Toast.Error_sended'))
        }
        formik.setFieldValue('body', '')
    }
    
    return (
        <form novalidate className="py-1 border rounded-2" onSubmit={onSubmit}>
            <div className="input-group has-validation">
                <input name="body" aria-label="Новое сообщение" placeholder={t('Chat_form.Enter_a_message')} className="border-0 p-0 ps-2 form-control" id = 'body' value={formik.values.body} onChange={formik.handleChange} disabled = {status !=='succeeded'} ref = {inputEl} autoFocus={!isAnyModalOpen}/>
                <button type="submit" disabled = {formik.values.body === '' || status !=='succeeded'} className="btn btn-group-vertical">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                    </svg>
                    <span className="visually-hidden">{t('Send')}</span>
                </button>
            </div>
        </form>
    )
}


export default ChatForm