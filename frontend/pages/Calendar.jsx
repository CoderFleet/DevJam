import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import DashHeader from "../components/DashHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import { ThemeProvider } from "../context/ThemeContext";
import "./Calendar.css";
import { axiosInstance } from "../src/lib/axios";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// function renderEventContent(eventInfo) {
//   const eventDetails = eventInfo.event?._def;
//   return (
//     <div style={{ overflow: 'auto', padding: '10px', backgroundColor: '#fff', borderRadius: '5px' }}>
//       <div className="event-tooltip">
//         <div className="event-time">{eventInfo.timeText}</div>
//         <div className="event-title">{eventDetails?.title}</div>
//         <div className="event-description">{eventDetails?.extendedProps.description}</div>
//       </div>
//     </div>
//   );
// }
function Calendar() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axiosInstance.get("/schedules/getSchedules");

        const fetchedSchedules = response.data.data.map((schedule) => ({
          id: schedule._id,
          title: schedule.message,
          start: schedule.reminderDate,
          description: schedule.assignmentId
            ? schedule.assignmentId.title
            : schedule.taskId
            ? schedule.taskId.title
            : "General Reminder",
          allDay: true,
        }));

        setSchedules(fetchedSchedules);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSchedules();
  }, []);

  const handleEventClick = async (clickInfo) => {
    const confirmDelete = window.confirm(
      `Delete schedule: ${clickInfo.event.title}?`
    );

    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/schedules/${clickInfo.event.id}`);
        setSchedules((prevSchedules) =>
          prevSchedules.filter((event) => event.id !== clickInfo.event.id)
        );
      } catch (error) {
        console.error("Error deleting schedule:", error);
      }
    }
  };

  return (
    <ThemeProvider>
      <div className="h-screen">
        <DashHeader />
        <div className="fixed top-0 left-0 h-full w-[250px]">
          <DashboardSidebar />
        </div>
        <div className="Calendar">
          <FullCalendar
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth",
            }}
            height={"90vh"}
            plugins={[dayGridPlugin]}
            events={schedules}
            eventClick={handleEventClick}
            eventDidMount={(info) => {
              info.el.style.whiteSpace = "nowrap";
              info.el.style.overflow = "scroll";
              info.el.style.textOverflow = "ellipsis";
              info.el.style.fontSize = "12px";
            }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
export default Calendar;
