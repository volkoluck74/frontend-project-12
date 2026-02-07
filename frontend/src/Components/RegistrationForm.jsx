import registrationIMG from "./../assets/registration.jpg"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { registration, clearError, login } from "../slices/authSlice.jsx"
import { useEffect } from "react"
import * as Yup from 'yup'

const RegistrationForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { error, status } = useSelector(state => state.auth)
    
    const validationSchema = Yup.object({
        username: Yup.string()
            .min(3, 'Минимум 3 символа')
            .max(20, 'Максимум 20 символов')
            .required('Обязательное поле'),
        password: Yup.string()
            .min(6, 'Минимум 6 символов')
            .required('Обязательное поле'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Обязательное поле'),
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema,
        
        onSubmit: async (values) => {
            const newUser = { 
                username: values.username, 
                password: values.password, 
            }
            const result = await dispatch(registration(newUser))
            if (registration.fulfilled.match(result)) {
                await dispatch(login(newUser))
                navigate('/')
            }    
        }
    })
    useEffect(() => {
        if (error) {
            dispatch(clearError())
        }
    }, [formik.values])

    const confirmPasswordError = 
        (formik.touched.confirmPassword && formik.errors.confirmPassword) || 
        (error && status === 'failed' ? error : null)
    return ( 
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <div className="card shadow-sm">
                        <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                            <div>
                                <img src={registrationIMG} className="rounded-circle" alt="Регистрация"/>
                            </div>
                            <form className="w-50" onSubmit={formik.handleSubmit}>
                                <h1 className="text-center mb-4">Регистрация</h1>
                                
                                <div className="form-floating mb-3">
                                    <input 
                                        placeholder="От 3 до 20 символов" 
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
                                        Имя пользователя
                                    </label>
                                    <div placement="right" className="invalid-tooltip">
                                    {formik.touched.username && formik.errors.username}
                                    </div>
                                </div>
                                
                                <div className="form-floating mb-3">
                                    <input 
                                        placeholder="Не менее 6 символов" 
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
                                        Пароль
                                    </label>
                                    <div placement="right" className="invalid-tooltip">
                                        {formik.touched.password && formik.errors.password}
                                    </div>
                                </div>
                                
                                <div className="form-floating mb-4">
                                    <input 
                                        placeholder="Пароли должны совпадать" 
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
                                        Подтвердите пароль
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
                                    Зарегистрироваться
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