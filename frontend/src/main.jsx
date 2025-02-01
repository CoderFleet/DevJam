import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ModalProvider from '../context/ModalContext.jsx'
import { UserProvider } from '../context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
   <UserProvider>
    <ModalProvider>
    <App />
    </ModalProvider>
    </UserProvider>
  </BrowserRouter>
  </StrictMode>,
)
