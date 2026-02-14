import image404 from './../assets/404-D_FLHmTM.svg';
import Header from './Header.jsx';
import { useTranslation} from 'react-i18next';

const NotFoundPage = () => {
  const {t} = useTranslation('all');
  return (
    <>
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Header/>
          <div className="text-center">
            <img alt="Страница не найдена" className="img-fluid h-25" src={image404} />
            <h1 className="h4 text-muted">{t('Not_Found.Page_not_found')}</h1>
            <p className="text-muted">{t('Not_Found.Page_not_found')}<a href="/">{t('Not_Found.At_main')}</a></p>
          </div>
        </div>
        <div className="Toastify"></div></div>
    </>
  );
};



export default NotFoundPage;