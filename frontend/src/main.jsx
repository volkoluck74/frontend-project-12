import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './slices/store.js'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

i18n.init({
}).then(() => {
  document.querySelector("body").classList.add("h-100", "bg-light")
  document.querySelector("html").classList.add("h-100")
  document.querySelector("#root").classList.add("h-100")

  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <StrictMode>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </StrictMode>
    </Provider>
  )
})
