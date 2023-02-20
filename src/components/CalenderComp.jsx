import React, { useState } from "react";
import Calendar from "react-calendar";
import "../style/Calender.css";

const CalenderComp = ({ date, setDate }) => {
  const current = new Date();
  const maxDate = current.setDate(current.getDate() + 7);
  const mDate = new Date(maxDate)


  return (
    <div className="app">
      <h1 className="text-center"></h1>
      <div className="calendar-container">
        <Calendar minDate={new Date()} maxDate={mDate}  onChange={setDate} value={date} />
      </div>
      {/* <p className='ml-4 mt-2'>
        <span  className='font-bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p> */}
    </div>
  );
};

export default CalenderComp;
