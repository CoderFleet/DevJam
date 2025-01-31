import React from 'react'
import { useState } from 'react'
import {motion} from "framer-motion"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import './styles.css';

const Home = () => {
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
    </div>
  )
}

export default Home
