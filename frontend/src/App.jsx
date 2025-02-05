import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import TaskDetails from './components/Tasksdetails'
import TaskManager from './components/Taskmanager'
function App() {

  return (

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<TaskManager />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
      </Routes>
   
  )
}

export default App
