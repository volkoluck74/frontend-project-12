import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {login} from "../slices/authSlice.jsx"

const LoginForm = () => {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
    });
    const navigate = useNavigate()
    const onSubmit =  async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(formik.values))
            navigate('/')

        }
        catch {
            navigate('/login')
        }
    }
    return (
        <form className="col-12 col-md-6 mt-3 mt-md-0" onSubmit={onSubmit}>
            <h1 className="text-center mb-4">Войти</h1>
                <div className="form-floating mb-3">
                    <input name="username" autocomplete="username" required placeholder="Ваш ник" id="username" className="form-control" value={formik.values.username} onChange={formik.handleChange}/>
                    <label htmlFor="username">Ваш ник</label>
                </div>
                <div className="form-floating mb-4">
                    <input name="password" autocomplete="current-password" required placeholder="Пароль" type="password" id="password" className="form-control" value={formik.values.password} onChange={formik.handleChange}/>
                    <label className="form-label" htmlFor="password">Пароль</label>
                </div>
                <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
        </form>
    )
}

export default LoginForm