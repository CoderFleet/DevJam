import React from 'react'
import { useState } from 'react'
import {motion} from "framer-motion"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import './styles.css';
import useScrollTo from '../hooks/useScrollTo'
import Login from './Login'
import Signup from './Signup'
import useActiveForm from '../hooks/useActiveForm'
import Modal from '../components/Modal'
import { useModal } from '../context/ModalContext'

const Home = () => {
  const [isActive1, setIsActive1] = useState(false);

  const scrollTo = useScrollTo();
  const { isModalOpen, toggleModal } = useModal();
  const [isSignUp, toggleForm] = useActiveForm();

  const toggleActiveClass = () => {
    setIsActive1(!isActive1);
  };

  const removeActive = () => {
    setIsActive1(false);
  };

  const openGetStartedModal = () => {
    toggleModal();
  };

  return (
    <div>
        {/* Starry Background */}
        <div className='star'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

       {/* Navbar */}
       <div className="App">
        <header className="App-header">
          <nav className="bg-[#c3bef0] shadow-md relative flex px-6 py-4 flex justify-between items-center min-h-[60px] fixed w-full top-0 left-0 z-20">
            <a href="/" className="text-2xl font-bold text-gray-800">
              <img src="logo.jpg" alt="Logo" className="w-16 h-16" />
            </a>

            {/* Navigation Menu */}
            <ul className={`transition-all duration-200 ease-in-out ${isActive1 ? 'absolute top-[70px] left-0 w-full bg-[#c3bef0] py-4 flex flex-col md:flex-row gap-8' : 'hidden md:flex gap-8'}`}>
              <li onClick={removeActive}>
                <a href="/home" className="text-lg font-extrabold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#430f58] to-[#6643b5] hover:from-[#6643b5] hover:to-[#430f58] transition-all">
                  Home
                </a>
              </li>
              <li onClick={openGetStartedModal}>
                <span className="text-lg font-extrabold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#430f58] to-[#6643b5] hover:from-[#6643b5] hover:to-[#430f58] transition-all">
                  Get Started
                </span>
              </li>
              <li onClick={() => scrollTo('contact-us')}>
                <span className="text-lg font-extrabold cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-[#430f58] to-[#6643b5] hover:from-[#6643b5] hover:to-[#430f58] transition-all">
                  Contact Us
                </span>
              </li>
            </ul>

            {/* Hamburger Icon for smaller screens */}
            <div className="md:hidden cursor-pointer" onClick={toggleActiveClass}>
              <span className={`block w-6 h-[3px] bg-gray-800 transition-all duration-300 ${isActive1 ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-[3px] bg-gray-800 transition-all duration-300 ${isActive1 ? 'opacity-0' : 'my-1'}`} />
              <span className={`block w-6 h-[3px] bg-gray-800 transition-all duration-300 ${isActive1 ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </nav>
        </header>
      </div>
    </div>
  )
}

export default Home
