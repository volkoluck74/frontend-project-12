import { useDispatch, useSelector } from 'react-redux'
import { removeChannel } from '../slices/channelSlice'
import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useToast from '../hooks/useToast.js'
import { changeCurrentRemoveChannel, closeRemovingChannelDialog, changeCurrentChannel } from '../slices/UIslice.jsx'

const RemovingChannelDialog = () => {
  const { t } = useTranslation('all')
  const dispatch = useDispatch()
  const { showSuccess, showError } = useToast()
  const { currentRemoveChannelId } = useSelector(state => state.uiState)
  const modalRef = useRef(null)
  const deleteChannel = async () => {
    try {
      await dispatch(removeChannel(currentRemoveChannelId)).unwrap()
      dispatch(closeRemovingChannelDialog())
      dispatch(changeCurrentChannel({ id: '1' }))
      showSuccess(t('Toast.Channel_deleted'))
    }
    catch (e) {
      showError(t('Toast.Error_sended'))
      throw e
    }
  }
  const cancelRemovingChannel = () => {
    dispatch(changeCurrentRemoveChannel({ id: 0 }))
    dispatch(closeRemovingChannelDialog())
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currentRemoveChannelId !== 0
        && modalRef.current
        && !modalRef.current.contains(event.target)) {
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
    <div role="dialog" aria-modal="true" style={{ display: 'block' }} className="fade modal show" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered" ref={modalRef}>
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('Delete_Channel')}</div>
            <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={cancelRemovingChannel}></button>
          </div>
          <div className="modal-body">
            <p className="lead">{t('Are_you_sure')}</p>
            <div className="d-flex justify-content-end">
              <button type="button" className="me-2 btn btn-secondary" onClick={cancelRemovingChannel}>{t('Cancel')}</button>
              <button type="button" className="btn btn-danger" onClick={deleteChannel}>{t('Delete')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemovingChannelDialog
