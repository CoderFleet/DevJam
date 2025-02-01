import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from '../pages/Home'
import ModalProvider from '../context/ModalContext'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { UserProvider } from '../context/UserContext'
function App() {

  return (
    <ModalProvider>
      <UserProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </UserProvider>
    </ModalProvider>
  )
}

export default App
