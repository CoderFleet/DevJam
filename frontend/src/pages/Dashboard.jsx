import React from 'react'
import './theme.css'
import { IoIosLogOut } from "react-icons/io";
import { FaChartBar, FaCalendarAlt, FaFacebookMessenger, FaUsersCog } from "react-icons/fa";
import ThemeSwitcher from '../components/ThemeSwitcher';
import { ThemeProvider } from '../context/ThemeContext'
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {



  return (

    <ThemeProvider>
    <div className='h-screen'>
          <Header/>
          <Sidebar/>
    </div>
    </ThemeProvider>
    
  )
}

export default Dashboard
