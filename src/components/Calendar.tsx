import { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";

export default function TaskCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-card">
      <h2>Calendario</h2>

      <Calendar
        onChange={(value) => setDate(value as Date)}
        value={date}
      />
    </div>
  );
}