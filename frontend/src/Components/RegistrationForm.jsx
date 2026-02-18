import registrationIMG from './../assets/registration.jpg'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registration, clearError, login } from '../slices/authSlice.jsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useToast from '../hooks/useToast.js'
import { validationSchemaRegistration } from './../utils/validationSchema.js'
import createSubmitHandler from './../utils/createSubmitHandler.js'
const min = 3
const max = 20
const minPassword = 6

const RegistrationForm = () => {
  const { t } = useTranslation('all')
  const { showError } = useToast()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, status } = useSelector(state => state.auth)
  const validationSchema = validationSchemaRegistration(min, max, minPassword, t)
  const handlerSubmit = createSubmitHandler({
    dispatch,
    actions: [
      {
        action: registration,
        transform: data => ({
          username: data.username,
          password: data.password,
        }),
      },
      {
        action: login,
        transform: data => ({
          username: data.username,
          password: data.password,
        }),
      },
    ],
    showError,
    t,
    onSuccess: () => navigate('/'),
    errorMessage: 'Toast.Error_sended',
  })
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: handlerSubmit,
  })
  const confirmPasswordError = (formik.touched.confirmPassword && formik.errors.confirmPassword) || (error && status === 'failed' ? error : null)
  useEffect(() => {
    if (error) {
      dispatch(clearError())
    }
  }, [formik.values])
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={registrationIMG} className="rounded-circle" alt="Регистрация" />
              </div>
              <form className="w-100" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('Registration')}</h1>
                <div className="form-floating mb-3">
                  <input
                    placeholder={t('Form.Count_symbol', { min, max })}
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
                  <div data-bs-placement="right" className="invalid-tooltip">
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
                  <div data-bs-placement="right" className="invalid-tooltip">
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
                  <div data-bs-placement="right" className="invalid-tooltip">
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
