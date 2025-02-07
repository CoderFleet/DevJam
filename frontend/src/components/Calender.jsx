import React from "react";
import { useTasks } from "../context/TaskContext";
import EventCalendar from "./EventCalender";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const Calendar = () => {
  const { tasks } = useTasks();
  const theme = useTheme();

  const events = tasks
    .filter((task) => task.due_date) // Only tasks with due dates
    .map((task) => ({
      date: new Date(task.due_date),
      title: task.title,
    }));

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default Calendar;
