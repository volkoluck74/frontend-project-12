import registrationIMG from './../assets/registration.jpg'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registration, clearError, login } from '../slices/authSlice.jsx'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import useToast from '../hooks/useToast.js'
const min = 3
const max = 20
const minPassword = 6

const RegistrationForm = () => {
  const { t } = useTranslation('all')
  const { showError } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, status } = useSelector(state => state.auth)

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(min, t('Form.Count_symbol', { min, max }))
      .max(max, t('Form.Count_symbol', { min, max }))
      .required(t('Form.Required')),
    password: Yup.string()
      .min(minPassword, t('Form.Min_count_symbol_password', { count: minPassword }))
      .required(t('Form.Required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('Form.Passwords_have_been_match'))
      .required(t('Form.Required')),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const newUser = {
          username: values.username,
          password: values.password,
        }
        await dispatch(registration(newUser)).unwrap()
        await dispatch(login(newUser)).unwrap()
        navigate('/')
      } catch (e) {
        showError(t('Toast.Error_sended'))
        throw e
      }
    },
  })
  useEffect(() => {
    if (error) {
      dispatch(clearError())
    }
  }, [formik.values])

  const confirmPasswordError
    = (formik.touched.confirmPassword && formik.errors.confirmPassword)
    || (error && status === 'failed' ? error : null)
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={registrationIMG} className="rounded-circle" alt="Регистрация" />
              </div>
              <form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('Registration')}</h1>

                <div className="form-floating mb-3">
                  <input
                    placeholder = {t('Form.Count_symbol', { min, max })}
                    name="username"
                    autoComplete="username"
                    required
                    id="username"
                    className={`form-control ${(formik.touched.username && formik.errors.username) || (error && status === 'failed') ? 'is-invalid' : ''}`}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-label" htmlFor="username">
                    {t('Username')}
                  </label>
                  <div placement="right" className="invalid-tooltip">
                    {formik.touched.username && formik.errors.username}
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    placeholder={t('Form.Min_count_symbol', { count: minPassword })}
                    name="password"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    className={`form-control ${
                      (formik.touched.password && formik.errors.password) || (error && status === 'failed') ? 'is-invalid' : ''
                    }`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-label" htmlFor="password">
                    {t('Password')}
                  </label>
                  <div placement="right" className="invalid-tooltip">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>

                <div className="form-floating mb-4">
                  <input
                    placeholder={t('Form.Passwords_have_been_match')}
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label className="form-label" htmlFor="confirmPassword">
                    {t('Confirm_Password')}
                  </label>
                  <div placement="right" className="invalid-tooltip">
                    {confirmPasswordError}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-100 btn btn-outline-primary"
                  disabled={status === 'loading'}
                >
                  {t('Confirm_Password')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
