import React from "react";
import { useTasks } from "../context/TaskContext";
import EventCalendar from "./EventCalender";
import { ThemeProvider } from "../context/ThemeContext";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useTheme } from "../context/ThemeContext";

const Calendar = () => {
  const { tasks } = useTasks();
 const theme=useTheme();
  const events = tasks
    .filter((task) => task.due_date) // Only tasks with due dates
    .map((task) => ({
      date: new Date(task.due_date),
      title: task.title,
    }));

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default Calendar;
