import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../slices/authSlice.jsx'
import hasToken from '../utils/hasToken.js'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation('all')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmitLogout = e => {
    e.preventDefault()
    dispatch(logout())
    navigate('/login')
  }
  const isAuthorization = hasToken()
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">{t('Header_name')}</a>
        {isAuthorization ? <button type="button" className="btn btn-primary" onClick={onSubmitLogout}>{t('Exit')}</button> : null }
      </div>
    </nav>
  )
}

export default Header
