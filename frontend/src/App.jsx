import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
// import Chat from "../pages/Chat";
import Dashboard from "../Dashboard/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/chats" element={<Chat />} /> */}
      <Route path="/dash" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
