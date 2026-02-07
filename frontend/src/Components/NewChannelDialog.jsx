import { useFormik} from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef} from 'react'
//import axios from 'axios'
//import getAuthHeader from './../utils/getAuthHeader.js'
//import {io} from 'socket.io-client'
import {postChannel} from "../slices/channelSlice.jsx"
import {changeCurrentChannel, closeChannelDialog, setChannelChangeError} from "../slices/UIslice.jsx"
import * as Yup from 'yup'


const NewChannelDialog = () => {
    const dispatch = useDispatch()
    const {channelChangeError} = useSelector(state => state.uiState)
    const {channels, status} = useSelector(state => state.channels)
    const modalRef = useRef(null)
    const inputEl = useRef(null)
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .min(3, 'Слишком мало символов')
            .max(20, "Слишком много символов")
            .required('Обязательное поле')
            .test('unique-name', 'Должно быть уникальным', (value) => {
                if (!value) return true;
                return !channels.map(item => item.name).includes(value.trim());
              }),
        }),
    });
    const isDisabled = status === 'loading' || formik.isSubmitting
    const closeNewChannelDialog = () => {
        dispatch(closeChannelDialog())
        dispatch(setChannelChangeError({ error: '' }))
    }
    useEffect(() => {
        inputEl.current?.focus()
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target) && !isDisabled) {
                closeNewChannelDialog()
            }
        }
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && !isDisabled) {
                closeNewChannelDialog()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscapeKey)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [closeNewChannelDialog, isDisabled])
    const onSubmit = async (e) => {
        e.preventDefault()
        const errors = await formik.validateForm()
        formik.setTouched({ name: true }, false)
        
        if (Object.keys(errors).length === 0) {
            const newChannel = {
                name: formik.values.name.trim(),
            }
            dispatch(postChannel(newChannel))
                .unwrap() 
                .then((response) => {
                    closeNewChannelDialog()
                    dispatch(setChannelChangeError({ error: '' }))
                    formik.resetForm()
                    console.log(response)
                    dispatch(changeCurrentChannel({id: response.id}))
                    
                })
                .catch((error) => {
                    console.log('Ooops', error)
                    dispatch(setChannelChangeError({ 
                        error: error.message || 'Ошибка при создании канала' 
                    }))
                })
        } else {
            dispatch(setChannelChangeError({ error: errors.name || 'Ошибка валидации' }))
        }
    }
    //const socket = io();
    
    //const token = getAuthHeader()
    //const {currentChannelId} = useSelector(state => state.channels)
    //const {status} = useSelector(state => state.chats)

    return (
        <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style = {{display: "block"}}>
            <div className="modal-dialog modal-dialog-centered" ref={modalRef}>
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title h4">Добавить канал</div>
                        <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={closeNewChannelDialog} disabled = {isDisabled}></button>
                    </div>
                    <div class="modal-body">
                            <form className="" onSubmit={onSubmit}>
                                <div>
                                    <input name="name" id="name" className={channelChangeError === '' ? "mb-2 form-control" : "mb-2 form-control is-invalid"} value={formik.values.name} onChange={formik.handleChange} ref = {inputEl} disabled = {isDisabled}/>
                                    <label className="visually-hidden" htmlFor="name">Имя канала</label>
                                    <div className="invalid-feedback">{channelChangeError}</div>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="me-2 btn btn-secondary" onClick={closeNewChannelDialog} disabled = {isDisabled}>Отменить</button>
                                        <button type="submit" className="btn btn-primary" disabled = {isDisabled}>Отправить</button>
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default NewChannelDialog