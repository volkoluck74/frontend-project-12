import { useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../slices/authSlice.jsx"
import hasToken from '../utils/hasToken.js'


const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onSubmitLogout = async (e) => {
        e.preventDefault();
        try {
            await dispatch(logout())
            navigate('/login')
        } catch {
            navigate('/')
        }
    }
    const isAuthorization = hasToken()
    return (
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
                {isAuthorization ? <button type="button" className="btn btn-primary" onClick={onSubmitLogout}>Выйти</button> : null }
            </div>
        </nav>
    )
}

export default Header