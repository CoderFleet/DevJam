import React from 'react'
import './theme.css'
import { IoIosLogOut } from "react-icons/io";
import { FaChartBar, FaCalendarAlt, FaFacebookMessenger, FaUsersCog } from "react-icons/fa";
import ThemeSwitcher from '../components/ThemeSwitcher';
import { ThemeProvider } from '../context/ThemeContext'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import QuoteDisplay from '../components/QuotesDisplay';
import TaskManager from '../components/Taskmanager';
const Dashboard = () => {



  return (

    <ThemeProvider>
    <div className='h-screen'>
          <Header/>
          <Sidebar/>
          <div className='h-90 space-y-200 flex flex-co items-center justify-center'>  
          <QuoteDisplay />
          </div>
          
          <TaskManager/>

    </div>
    </ThemeProvider>
    
  )
}

export default Dashboard
