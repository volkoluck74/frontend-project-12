import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './slices/store.js'

document.querySelector("body").classList.add("h-100", "bg-light")
document.querySelector("html").classList.add("h-100")
document.querySelector("#root").classList.add("h-100")

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
