import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
function App() {

  return (

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
   
  )
}

export default App
