import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Chat from "../pages/Chat";
import Dashboard from "../pages/Dashboard";
import Assignments from "../pages/Assignments";
// import Calendar from "../pages/Calendar"
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import Profile from "../pages/Profile";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-base-300">
        <span className="loading loading-spinner loading-lg"></span>
        <h1 className="text-base-content mt-4">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/chats"
          element={authUser ? <Chat /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard"
          // eslint-disable-next-line no-constant-condition
          element={authUser ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/assignments"
          // eslint-disable-next-line no-constant-condition
          element={authUser ? <Assignments /> : <Navigate to="/" />}
        />
        {/* <Route path="/calendar" element={<Calendar />} /> */}
        <Route
          path="/profile"
          // eslint-disable-next-line no-constant-condition
          element={authUser ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
