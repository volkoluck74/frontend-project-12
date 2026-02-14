import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../slices/authSlice.jsx'
import { useTranslation } from 'react-i18next'
import useToast from '../hooks/useToast.js'

const LoginForm = () => {
  const { error, status } = useSelector(state => state.auth)
  const { t } = useTranslation('all')
  const dispatch = useDispatch()
  const { showError } = useToast()
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await dispatch(login(values)).unwrap()
        navigate('/')
      }
      catch (e) {
        showError(t('Toast.Error_sended'))
        throw e
      }
    },
  })
  const navigate = useNavigate()

  return (
    <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">{t('Enter')}</h1>
      <div className="form-floating mb-3">
        <input
          name="username"
          autoComplete="username"
          required
          placeholder={t('Login.Your_nick')}
          id="username"
          className={`form-control ${error && status === 'failed' ? 'is-invalid' : ''}`}
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <label htmlFor="username">{t('Login.Your_nick')}</label>
      </div>
      <div className="form-floating mb-4">
        <input
          name="password"
          autoComplete="current-password"
          required
          placeholder={t('Password')}
          type="password"
          id="password"
          className={`form-control ${error && status === 'failed' ? 'is-invalid' : ''}`}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <label className="form-label" htmlFor="password">{t('Password')}</label>
        <div className="invalid-tooltip">{error}</div>
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">{t('Enter')}</button>
    </form>
  )
}

export default LoginForm
