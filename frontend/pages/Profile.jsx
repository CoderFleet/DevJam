import { useAuthStore } from "../src/store/useAuthStore";
import { ThemeProvider } from "../context/ThemeContext";
import DashHeader from "../components/DashHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Profile = () => {
  const { authUser, logout, checkAuth, isCheckingAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    if (!authUser && !isCheckingAuth) {
      toast.error("You need to be logged in to access this page");
      navigate("/");
    }
  }, [authUser, checkAuth, isCheckingAuth, navigate]);

  if (isCheckingAuth) {
    return (
      <div className="text-white text-center mt-20">
        Checking authentication...
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="h-screen">
        <DashHeader />
        <div className="fixed top-0 left-0 h-full w-[250px]">
          <DashboardSidebar />
        </div>
        <div className="ml-[250px] overflow-y-auto h-screen font-quicksand">
          <div className="artboard artboard-horizontal phone-5 z-[-1] flex justify-center gap-10 items-center shadow-[0_0_1rem_#ffffff,inset_0_0_1rem_rgb(255,255,255)] h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6">
            <motion.figure
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-130 bg-blue rounded h-130 p-10">
              <img
                className="w-full h-full object-cover rounded-full shadow-[0_0_1rem_#ffffff,inset_0_0_1rem_rgb(255,255,255)]"
                src={
                  authUser?.avatar ||
                  "http://res.cloudinary.com/the-secretary/image/upload/v1739008039/photo_6156683689099114061_x.jpg"
                }
                alt="Profile"
              />
            </motion.figure>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="flex flex-col gap-6 p-6 text-center md:text-left">
              <h2 className="text-5xl font-extrabold text-white tracking-wide drop-shadow-md">
                Name:{" "}
                <span className="text-blue-400 mt-10 font-quicksand">
                  {authUser?.fullName || "Unknown"}
                </span>
              </h2>
              <p className="text-4xl text-white font-light">
                Email: {authUser?.email || "Not provided"}
              </p>
              <p className="text-4xl text-white font-light">
                Username: {authUser?.username || "N/A"}
              </p>

              <div className="flex justify-center md:justify-start">
                <button
                  onClick={logout}
                  className="ml-30 mt-10 px-10 py-2 text-lg font-semibold bg-white text-black rounded-lg transition-all duration-300 hover:bg-blue-200 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/60 transform hover:scale-105">
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Profile;
