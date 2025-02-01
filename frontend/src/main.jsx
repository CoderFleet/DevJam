import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ModalContext from './context/ModalContext'

createRoot(document.getElementById('root')).render(
  <ModalContext>
  <StrictMode>
    <App />
  </StrictMode>
  </ModalContext>,
)
