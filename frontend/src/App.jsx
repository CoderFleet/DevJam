import React from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import TaskManager from './components/Taskmanager'
import AssignmentsManager from './components/AssignmentsManager'
import Chats from './pages/Chats'
import Calender from './components/Calender'
function App() {

  return (

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<TaskManager />} />
        <Route path='/assignments' element={<AssignmentsManager/>}/>
        <Route path='/chats' element={<Chats/>}/>
        <Route path="/calender" element={<Calender/>}/>;
      </Routes>
   
  )
}

export default App
