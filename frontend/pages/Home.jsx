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
import ContactUs from './ContactUs'
import Photos from './Photos'
import Layout1 from './Layout1'
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
    <div className="scoped-styles">
    <div >
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
       <div id="top" className="App">
        <header className="App-header">
          <nav className="bg-[#c3bef0] shadow-md flex flex justify-between items-center min-h-[60px] fixed w-full top-0 left-0 z-20">
            <a href="/" className="text-2xl font-bold text-gray-800">
              <img src="logo.jpg" alt="Logo" className="w-20 h-16" />
            </a>

            {/* Navigation Menu */}
            <ul className={`transition-all duration-200 ease-in-out ${isActive1 ? 'absolute top-[70px] left-0 w-full bg-[#c3bef0] py-4 flex flex-col md:flex-row gap-8' : 'hidden md:flex gap-8'}`}>
              <li onClick={() => scrollTo('top')} className="text-lg font-extrabold cursor-pointer ">
                  Home
          
              </li>
              <li onClick={openGetStartedModal} className="text-lg font-extrabold cursor-pointer ">
                  Get Started
                
              </li>
              <li onClick={() => scrollTo('contact-us')} className="text-lg font-extrabold cursor-pointer transition-all">
                  Contact Us
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
       {/* Main Container */}
       <div className="z-20 mt-60 flex flex-col justify-center p-2 md:p-11 items-center gap-y-20 ">
        <motion.h1
          className="text-6xl z-20 sm:text-7xl lg:text-8xl pt-50 font-extrabold tracking-wide text-center text-white font-serif mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            bounce: 0.4,
            type: "spring",
          }}
          whileHover={{
            scale: 1.1,
            color: "#c3bef0",
            boxShadow: "0 0 1rem #ffffff, inset 0 0 1rem rgb(255, 255, 255), 0 0 2rem #ffffff, inset 0 0 2rem rgb(255, 255, 255)",
          }}
        >
          ASSIGNIFY
        </motion.h1>
        <p className="sm:text-lg lg:text-xl text-white italic max-w-xl text-center">
          "The future belongs to those who learn more skills and combine them in creative ways." – Robert Greene
        </p>
        <Layout1 />
      </div>
      <div id="contact-us">

      </div>
     <br/>
     <br/>
     <br/>
     <br/>
     <br/><br/>
      {/* Contact Us Section */}
      <div  className="min-h-screen mt-60">
        <div className=" z-20 flex flex-col justify-center p-2 md:p-11 items-center gap-y-10">
          <motion.h1
            className="text-6xl relative z-20 sm:text-7xl lg:text-8xl pt-50 font-extrabold tracking-wide text-center text-white font-serif mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              bounce: 0.4,
              type: "spring",
            }}
            whileHover={{
              scale: 1.1,
              color: "#c3bef0",
              boxShadow: "0 0 1rem #ffffff, inset 0 0 1rem rgb(255, 255, 255), 0 0 2rem #ffffff, inset 0 0 2rem rgb(255, 255, 255)",
            }}
          >
            CONTACT US
          </motion.h1>
        </div>
        <br/>
        <br/>
        <br/>
        <div className="flex flex-col gap-30 lg:flex-row w-full min-h-screen space-y-10 lg:space-y-0 lg:space-x-4">
          {/* Left Side: Contact Us */}
          <div className="flex items-start justify-center w-screen lg:w-1/2 p-4">
            <ContactUs />
          </div>

          {/* Right Side: Photo Content */}
          <div className="flex items-start justify-center w-full lg:w-1/2 p-4">
            <Photos />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home
