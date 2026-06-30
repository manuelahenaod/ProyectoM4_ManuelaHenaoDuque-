import Calendar from "react-calendar";
import type { Task } from "../types/task";
import { isSameDay } from "../utils/date";

import "react-calendar/dist/Calendar.css";
import "../styles/Calendar.css";

type TaskCalendarProps = {
  tasks: Task[];
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
};

export default function TaskCalendar({
  tasks,
  selectedDate,
  onDateChange,
}: TaskCalendarProps) {

  function getTileClassName({ date }: { date: Date }) {
    const hasTask = tasks.some((task) => isSameDay(task.dueDate, date));
    return hasTask ? "has-task" : null;
  }

  function handleChange(value: unknown) {
    const date = value as Date;
    if (selectedDate && isSameDay(date, selectedDate)) {
      onDateChange(null);
    } else {
      onDateChange(date);
    }
  }

  return (
    <div className="calendar-card">
      <h2>Calendario</h2>

      <Calendar
        onChange={handleChange}
        value={selectedDate}
        tileClassName={getTileClassName}
      />
    </div>
  );
}