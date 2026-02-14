import avatar from './../assets/avatar-DIE1AEpS.jpg';
import LoginForm from './LoginForm';
import { Navigate } from 'react-router-dom';
import hasToken from '../utils/hasToken.js';
import Header from './Header.jsx';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation('all');
  return (
    (!hasToken())
      ? (
        <>
          <div className="d-flex flex-column h-100">
            <Header />
            <div className="container-fluid h-100">
              <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                  <div className="card shadow-sm">
                    <div className="card-body row p-5">
                      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                        <img src={avatar} className="rounded-circle" alt={t('Enter')} />
                      </div>
                      <LoginForm />
                    </div>
                    <div className="card-footer p-4">
                      <div className="text-center">
                        <span>{t('Login.Hasnt_account')}</span>
                        <a href="/signup">{t('Registration')}</a>
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
      : <Navigate to="/" />
  );
};

export default LoginPage;
