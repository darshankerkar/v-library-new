import React, { useState } from "react";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const matrix = [];
  let week = Array(firstDay).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }
  return matrix;
}

function Calender() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const matrix = getMonthMatrix(year, month);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const isToday = (day) =>
    day &&
    year === today.getFullYear() &&
    month === today.getMonth() &&
    day === today.getDate();

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <button onClick={prevMonth} className="px-2 text-2xl">&lt;</button>
          <span>
            {today.toLocaleString("default", { month: "long" , year: "numeric" , timeZone: "UTC" })
              .replace(today.getFullYear(), year)
              .replace(today.toLocaleString("default", { month: "long" }), 
                new Date(year, month).toLocaleString("default", { month: "long" })
              )
            } {year}
          </span>
          <button onClick={nextMonth} className="px-2 text-2xl">&gt;</button>
        </h2>
      </div>
      <table className="w-full border text-center">
        <thead>
          <tr>
            {WEEK_DAYS.map((d) => (
              <th key={d} className="py-2 border-b font-semibold">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((week, i) => (
            <tr key={i}>
              {week.map((day, j) => {
                const isWeekend = j === 0 || j === 6;
                return (
                  <td
                    key={j}
                    className={`h-20 border
                      ${isToday(day) ? "bg-yellow-100 border-yellow-500" : ""}
                      ${isWeekend ? "bg-gray-50" : ""}
                      align-top`}
                  >
                    <div className="font-bold">{day || ""}</div>
                    <div className="text-xs mt-1">
                      {day
                        ? isWeekend
                          ? "Closed"
                          : "8:00 am - 6 pm"
                        : ""}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  return(
    <>
      <Calender />
    </>
  )
}

export default App;