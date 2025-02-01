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
      <br/>
       <br/>
       <br/>
      {/* Modal Component */}
      {isModalOpen && (
        <Modal>
          <div className="relative w-full max-w-3xl h-[500px] bg-white shadow-lg overflow-hidden flex">
            {/* Sign Up Form */}
            <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center gap-5 transition-opacity duration-500 ${isSignUp ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {isSignUp && <Signup />}
            </div>
            {/* Sign In Form */}
            <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center gap-5 transition-opacity duration-500 ${isSignUp ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {!isSignUp && <Login />}
            </div>

            {/* Toggle Panel */}
            <div className="absolute top-0 left-1/2 w-1/2 h-full flex items-center justify-center text-white bg-[#c3bef0] p-5">
              <div className="text-center flex flex-col items-center gap-4">
                <h1 className="text-3xl font-bold text-black">{isSignUp ? "Hello, User!" : "Welcome User!"}</h1>
                <p className="text-black text-xl">{isSignUp ? "If you already have an account" : "If you don't have an account"}</p>
                <button onClick={toggleForm} className="h-10 w-24 bg-gradient-to-r from-[#430f58] to-[#6643b5] text-white py-2 px-6 mt-5 rounded-full">
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Home
