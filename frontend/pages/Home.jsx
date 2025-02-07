import { useState } from "react";
import { motion } from "framer-motion";
import Login from "./Login";
import Signup from "./Signup";
import useActiveForm from "../hooks/useActiveForm";
import Modal from "../components/Modal";
import { useModal } from "../context/ModalContext";
import ContactUs from "./ContactUs";
import Photos from "./Photos";
import Layout1 from "./Layout1";
import { FaBars, FaArrowRight } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import RollingQuotes from "../components/RollingQuotes";

const Home = () => {
  const { isModalOpen, toggleModal } = useModal();
  const [isSignUp, toggleForm] = useActiveForm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openGetStartedModal = () => {
    toggleForm(true);
    toggleModal();
  };

  const openLoginModal = () => {
    toggleForm(false);
    toggleModal();
  };

  return (
    <div>
      {/* Navbar */}
      <div className="flex flex-col">
        {/* Top navbar */}
        <nav className="navbar justify-between gap-4 bg-base-300 p-2">
          {/* Logo */}
          <a className="btn btn-ghost text-lg flex items-center gap-2">
            <HiOutlineBadgeCheck className="size-8" />
          </a>
          {/* Menu (Desktop) */}
          <div className="shrink-0 hidden md:flex gap-2">
            <a className="btn btn-sm btn-ghost" onClick={openGetStartedModal}>
              Create Account
            </a>
            <a
              className="btn btn-sm btn-primary flex items-center gap-1"
              onClick={openLoginModal}>
              Log in
              <FaRightToBracket />
            </a>
          </div>

          {/* Menu (Mobile) */}
          <div className="md:hidden relative">
            <button
              className="btn btn-ghost"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <FaBars className="text-lg" />
            </button>

            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 dropdown-content menu z-10 bg-base-200 p-4 rounded-box shadow w-56 gap-2">
                <li onClick={openGetStartedModal}>
                  <a>Create Account</a>
                </li>
                <a
                  className="btn btn-primary btn-sm flex items-center gap-1"
                  onClick={openLoginModal}>
                  Log in
                  <FaArrowRight />
                </a>
              </ul>
            )}
          </div>
        </nav>
      </div>
      {/* Modal Component */}
      {isModalOpen && (
        <Modal>
          <div className="relative w-full max-w-3xl h-[500px] bg-white shadow-lg overflow-hidden flex">
            {/* Sign Up Form */}
            <div
              className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center gap-5 transition-opacity duration-500 ${
                isSignUp ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}>
              {isSignUp && <Signup />}
            </div>
            {/* Sign In Form */}
            <div
              className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center gap-5 transition-opacity duration-500 ${
                isSignUp ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}>
              {!isSignUp && <Login />}
            </div>

            {/* Toggle Panel */}
            <div className="absolute top-0 left-1/2 w-1/2 h-full flex items-center justify-center text-white bg-[#c3bef0] p-5">
              <div className="text-center flex flex-col items-center gap-4">
                <h1 className="text-3xl font-bold text-black">
                  {isSignUp ? "Hello, User!" : "Welcome User!"}
                </h1>
                <p className="text-black text-xl">
                  {isSignUp
                    ? "If you already have an account"
                    : "If you don't have an account"}
                </p>
                <button onClick={toggleForm} className="btn btn-primary mt-5">
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {/* Main Container */}
      <div className="z-20 flex flex-col justify-center p-2 md:p-11 items-center gap-y-5 font-sans">
        <motion.h1
          className="text-6xl z-20 sm:text-7xl lg:text-8xl font-extrabold tracking-wide text-center text-white font-serif mb-6 p-4"
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
            boxShadow:
              "0 0 1rem #ffffff, inset 0 0 1rem rgb(255, 255, 255), 0 0 2rem #ffffff, inset 0 0 2rem rgb(255, 255, 255)",
          }}>
          ASSIGNIFY
        </motion.h1>
        <RollingQuotes />
        <a className="btn btn-primary" onClick={openGetStartedModal}>
          Get started
          <FaArrowRight className="size-6" />
        </a>
        <Layout1 />
      </div>
      <div className="mt-30">
        <div className="z-20 flex flex-col justify-center p-2 md:p-11 items-center gap-y-10">
          <motion.h1
            className="text-6xl relative z-20 sm:text-7xl lg:text-8xl p-10 font-extrabold tracking-wide text-center text-white font-serif mb-6"
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
              boxShadow:
                "0 0 1rem #ffffff, inset 0 0 1rem rgb(255, 255, 255), 0 0 2rem #ffffff, inset 0 0 2rem rgb(255, 255, 255)",
            }}>
            CONTACT US
          </motion.h1>
        </div>
        <div className="flex flex-col gap-30 lg:flex-row w-full min-h-screen space-y-10 lg:space-y-0 lg:space-x-4">
          <div className="flex items-start justify-center w-screen lg:w-1/2 p-4">
            <ContactUs />
          </div>
          <div className="flex items-start justify-center w-full lg:w-1/2 p-4">
            <Photos />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
