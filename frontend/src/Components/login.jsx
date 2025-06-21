//import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap/dist/js/bootstrap.bundle/min.js"
import avatar from "./../assets/avatar-DIE1AEpS.jpg"
import LoginForm from "./LoginForm"

const LoginPage = () => {
    return (
        <><div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                <div className="container">
                    <a className="navbar-brand" href="/">Hexlet Chat</a>
                </div>
            </nav>
            <div className="container-fluid h-100">
                <div className="row justify-content-center align-content-center h-100">
                    <div className="col-12 col-md-8 col-xxl-6">
                        <div className="card shadow-sm">
                            <div className="card-body row p-5">
                                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                                    <img src={avatar} className="rounded-circle" alt="Войти" />
                                </div>
                                <LoginForm />
                            </div>
                            <div className="card-footer p-4">
                                <div className="text-center">
                                    <span>Нет аккаунта?</span>
                                    <a href="/signup">Регистрация</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="Toastify"></div>
        </>
    )
}



export default LoginPage