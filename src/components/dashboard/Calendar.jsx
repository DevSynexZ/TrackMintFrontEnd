import React, { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { PiggyContext } from "../../context/PiggyContext";

export default function Calendar() {
  const {currentUser } = useContext(PiggyContext);

  if(!currentUser){
    return <div>Loading Calender</div>;
  }

  const user =  currentUser;

  const [events, setEvents] = useState([]);

  // Update events whenever user.expenses changes
  useEffect(() => {
    if (!user) return;
    const evts = (user.expenses || []).map((e, i) => ({
      id: i,
      title: `${e.category}: ${Math.round(e.amount)}`, // rounded for whole number
      date: e.date
    }));
    setEvents(evts);
  }, [user?.expenses]);

  return (
    <div className="panel">
      <h3>Expense Calendar</h3>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        height="auto"
      />
    </div>
  );
}