// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import './Calendar.css';
// import techEvents from '../data/events';
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
// function Calendar() {
//   return (
//     <div className="Calendar">
//       <FullCalendar
//         headerToolbar={{
//           start: 'today prev,next',
//           center: "title",
//           end: 'dayGridMonth',
//         }}
//         height={"90vh"}
//         plugins={[dayGridPlugin]}
//         events={techEvents}
//         eventContent={renderEventContent}
//         eventTimeFormat={{
//           hour: "2-digit",
//           minute: "2-digit",
//           meridiem: true,
//         }}
//       />
//     </div>
//   );
// }
// export default Calendar;