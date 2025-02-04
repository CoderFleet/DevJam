import React from "react";
import { addDays, subDays } from "date-fns";
import EventCalendar from "./EventCalender";

const Calender =()=> {
  const events = [
    { date: new Date("2025-02-10"), title: "Assgn" },  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-[#c3bef0] rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-indigo-600 mb-6">
          My Event Calendar
        </h1>
        <EventCalendar events={events} />
      </div>
    </div>
  );
};

export default Calender;
