import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ModalContext from './context/ModalContext'
import UserContext from '../context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserContext>
  <ModalContext>
  <StrictMode>
    <App />
  </StrictMode>
  </ModalContext>
  </UserContext>,
)
