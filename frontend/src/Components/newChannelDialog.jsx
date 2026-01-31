import { useFormik} from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef} from 'react'
//import axios from 'axios'
//import getAuthHeader from './../utils/getAuthHeader.js'
//import {io} from 'socket.io-client'
import {postChannel, setErrorAddingNewChannel} from "../slices/channelSlice.jsx"
import {changeCurrentChannel} from "../slices/UIslice.jsx"
import * as Yup from 'yup'


const NewChannelDialog = ({closeNewChannelDialog}) => {
    const dispatch = useDispatch()
    const {errorAddingNewChannel, channels, status} = useSelector(state => state.channels)
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
    const inputEl = useRef(null)
    useEffect(() => {
        inputEl.current?.focus()
    }, [])
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
                    dispatch(setErrorAddingNewChannel({ error: '' }))
                    formik.resetForm()
                    console.log(response)
                    dispatch(changeCurrentChannel({id: response.id}))
                    
                })
                .catch((error) => {
                    console.log('Ooops', error)
                    dispatch(setErrorAddingNewChannel({ 
                        error: error.message || 'Ошибка при создании канала' 
                    }))
                })
        } else {
            dispatch(setErrorAddingNewChannel({ error: errors.name || 'Ошибка валидации' }))
        }
    }
    //const socket = io();
    
    //const token = getAuthHeader()
    //const {currentChannelId} = useSelector(state => state.channels)
    //const {status} = useSelector(state => state.chats)
    const isDisabled = status === 'loading' || formik.isSubmitting

    return (
        <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style = {{display: "block"}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title h4">Добавить канал</div>
                        <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={closeNewChannelDialog} disabled = {isDisabled}></button>
                    </div>
                    <div class="modal-body">
                            <form className="" onSubmit={onSubmit}>
                                <div>
                                    <input name="name" id="name" className={errorAddingNewChannel === '' ? "mb-2 form-control" : "mb-2 form-control is-invalid"} value={formik.values.name} onChange={formik.handleChange} ref = {inputEl} ddisabled = {isDisabled}/>
                                    <label className="visually-hidden" htmlFor="name">Имя канала</label>
                                    <div className="invalid-feedback">{errorAddingNewChannel}</div>
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


/*
const NewChannelDialog = ({closeNewChannelDialog}) => {
    const formik = useFormik({
        initialValues: {
            name: '',
        },
    });
    //const socket = io();
    const dispatch = useDispatch()
    //const token = getAuthHeader()
    //const {currentChannelId} = useSelector(state => state.channels)
    //const {status} = useSelector(state => state.chats)
    const onSubmit =  async (e) => {
        e.preventDefault();
        const newChannel = { 
            name: formik.values.name, 
        }
        try {
            dispatch(postChannel(newChannel))
            closeNewChannelDialog();
            console.log("New channel send")
        }
        catch {
            console.log('Ooops')
        }
        
        formik.setFieldValue('name', '')
    }
    return (
        <div role="dialog" aria-modal="true" className="fade modal show" tabIndex="-1" style = {{display: "block"}}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-title h4">Добавить канал</div>
                        <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={closeNewChannelDialog}></button>
                    </div>
                    <div class="modal-body">
                        <Formik>
                            <Form className="" onSubmit={onSubmit}>
                                <div>
                                    <input name="name" id="name" classname="mb-2 form-control" value={formik.values.name} onChange={formik.handleChange}/>
                                    <label className="visually-hidden" htmlFor="name">Имя канала</label>
                                    <div className="invalid-feedback"></div>
                                    <div className="d-flex justify-content-end">
                                        <button type="button" className="me-2 btn btn-secondary" onClick={closeNewChannelDialog}>Отменить</button>
                                        <button type="submit" className="btn btn-primary">Отправить</button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}




export default NewChannelDialog

*/