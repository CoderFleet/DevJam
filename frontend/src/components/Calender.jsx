import React from "react";
import { useTasks } from "../context/TaskContext";
import EventCalendar from "./EventCalender";
<<<<<<< HEAD
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const Calendar = () => {
  const { tasks } = useTasks();
  const theme = useTheme();

=======
import { ThemeProvider } from "../context/ThemeContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "../context/ThemeContext";

const Calendar = () => {
  const { tasks } = useTasks();
 const theme=useTheme();
>>>>>>> 4e1f51c2bdb9bad8032998506527017ff5dee47a
  const events = tasks
    .filter((task) => task.due_date) // Only tasks with due dates
    .map((task) => ({
      date: new Date(task.due_date),
      title: task.title,
    }));

  return (
    <ThemeProvider>
<<<<<<< HEAD
      <Header />
      <Sidebar />
      <div
        className={`flex justify-center items-center min-h-screen transition-all duration-300 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div
          className="w-full max-w-lg p-6 rounded-lg shadow-lg transition-all duration-300
          bg-white dark:bg-gray-800 dark:text-white"
        >
          <h1 className="text-3xl font-semibold text-center mb-6">
            My Event Calendar
          </h1>
          <EventCalendar events={events} />
        </div>
      </div>
=======
      <Header/>
      <Sidebar/>
    <div className={`flex justify-center items-center min-h-screen ${theme==="dark"?"bg-white":"bg-black"}`}>
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-black mb-6">
          My Event Calendar
        </h1>
        <EventCalendar events={events} />
      </div>
    </div>
>>>>>>> 4e1f51c2bdb9bad8032998506527017ff5dee47a
    </ThemeProvider>
  );
};

export default Calendar;
