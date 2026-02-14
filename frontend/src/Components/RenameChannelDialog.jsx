import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useCallback } from 'react'
import { editChannel, selectAllChannels, selectChannelsStatus } from '../slices/channelSlice.jsx'
import { changeCurentRenameChannel, closeRenamingChannelDialog, setChannelChangeError } from '../slices/UIslice.jsx'
import * as Yup from 'yup'
import useToast from '../hooks/useToast.js'
import leoProfanity from 'leo-profanity'
const min = 3
const max = 20

const RenamingChannelDialog = () => {
  const dispatch = useDispatch()
  const { curentRenameChannelId, channelChangeError } = useSelector(state => state.uiState)
  const channels = useSelector(selectAllChannels)
  const status = useSelector(selectChannelsStatus)
  const modalRef = useRef(null)
  const inputEl = useRef(null)
  const { t } = useTranslation('all')
  useEffect(() => {
    leoProfanity.loadDictionary('ru, en')
  }, [])
  const { showSuccess } = useToast()
  const formik = useFormik({
    initialValues: {
      name: channels.find(item => item.id === curentRenameChannelId)?.name || '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(min, t('Form.Count_symbol', { min, max }))
        .max(max, t('Form.Count_symbol', { min, max }))
        .required(t('Form.Required'))
        .test('unique-name', t('Form.Have_been_unique'), value => {
          if (!value) return true
          return !channels.map(item => item.name).includes(value.trim())
        }),
    }),
  })
  const isDisabled = status === 'loading' || formik.isSubmitting
  const cancelRenamingChannel = useCallback(() => {
    if (status !== 'loading') {
      dispatch(changeCurentRenameChannel({ id: 0 }))
      dispatch(closeRenamingChannelDialog())
      dispatch(setChannelChangeError({ error: '' }))
    }
  }, [dispatch, status])

  useEffect(() => {
    inputEl.current?.focus()
    inputEl.current.setSelectionRange(0, inputEl.current.value.length)
    const handleClickOutside = e => {
      if (modalRef.current && !modalRef.current.contains(e.target) && !isDisabled) {
        cancelRenamingChannel()
      }
    }
    const handleEscapeKey = e => {
      if (e.key === 'Escape' && !isDisabled) {
        cancelRenamingChannel()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [cancelRenamingChannel, isDisabled])
  const onSubmit = async e => {
    e.preventDefault()
    const errors = await formik.validateForm()
    formik.setTouched({ name: true }, false)

    if (Object.keys(errors).length === 0) {
      console.log(typeof curentRenameChannelId)
      const newNameChannel = leoProfanity.clean(formik.values.name).trim()
      dispatch(editChannel({ newNameChannel, id: curentRenameChannelId }))
        .unwrap()
        .then(() => {
          dispatch(closeRenamingChannelDialog())
          dispatch(setChannelChangeError({ error: '' }))
          dispatch(changeCurentRenameChannel({ id: 0 }))
          showSuccess(t('Toast.Channel_renamed'))
          formik.resetForm()
        })
        .catch(error => {
          dispatch(setChannelChangeError({
            error: error.message,
          }))
          throw e
        })
    } else {
      dispatch(setChannelChangeError({ error: errors.name }))
    }
  }
  return (
    <div role="dialog" aria-modal="true" style = {{ display: 'block' }} className="fade modal show" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered" ref={modalRef}>
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('Channel.Rename')}</div>
            <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" disabled = {isDisabled} onClick={cancelRenamingChannel}></button>
          </div>
          <div className="modal-body">
            <form className="" onSubmit={onSubmit}>
              <div>
                <input name="name" id="name" className={channelChangeError === '' ? 'mb-2 form-control' : 'mb-2 form-control is-invalid'} value={formik.values.name} onChange={formik.handleChange} ref = {inputEl} disabled = {isDisabled} />
                <label className="visually-hidden" htmlFor="name">{t('Channel.Name')}</label>
                <div className="invalid-feedback">{channelChangeError}</div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="me-2 btn btn-secondary" disabled = {isDisabled} onClick={cancelRenamingChannel}>{t('Cancel')}</button>
                  <button type="submit" className="btn btn-primary" disabled = {isDisabled}>{t('Send')}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RenamingChannelDialog
