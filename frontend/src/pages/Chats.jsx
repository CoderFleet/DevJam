import React from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { getUsers } from '../utils/messageapi';
import { useState,useEffect } from 'react';





    
const Chats = () => {
  return (
    <ThemeProvider>
        <Header/>
      
      <Sidebar/>
      </ThemeProvider>
  )
};

export default Chats
