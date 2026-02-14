import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './slices/store.js';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as RollbarProvider } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '84c4f36d3617417db2b2736b2855167d',
  environment: 'testenv',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    client: {
      javascript: {
        code_version: '1.0.0',
        source_map_enabled: true,
        guess_uncaught_frames: true,
      },
    },
  },
};


i18n.init().then(() => {
  document.querySelector('body').classList.add('h-100', 'bg-light');
  document.querySelector('html').classList.add('h-100');
  document.querySelector('#root').classList.add('h-100');

  createRoot(document.getElementById('root')).render(
    <RollbarProvider config={rollbarConfig}>
      <Provider store={store}>
        <StrictMode>
          <I18nextProvider i18n={i18n}>
            <App />
            <ToastContainer />
          </I18nextProvider>
        </StrictMode>
      </Provider>
    </RollbarProvider>,
  );
});
