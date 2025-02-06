import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ModalProvider from './context/ModalContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskProvider } from './context/TaskContext.jsx'
import { AssignmentProvider } from './context/AssignmentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <AssignmentProvider>
  <TaskProvider>
  <AuthProvider>
   <UserProvider>
    <ModalProvider>
    <App />
    </ModalProvider>
    </UserProvider>
    </AuthProvider>
    </TaskProvider>
    </AssignmentProvider>
  </BrowserRouter>
  </StrictMode>,

