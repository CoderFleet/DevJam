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
          <div className="card card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
          <TaskManager/>

    </div>
    </ThemeProvider>
    
  )
}

export default Dashboard
