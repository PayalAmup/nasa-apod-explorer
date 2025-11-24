import React, { useState } from 'react';

export default function DatePickerView({ onRange, onDate }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [date, setDate] = useState('');

  return (
    <div className="date-picker">
      <h4>Pick a date</h4>
      <div className="row">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={() => date && onDate(date)}>Go</button>
      </div>

      <h4>Or a range</h4>
      <div className="row">
        <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        <button onClick={() => start && end && onRange(start, end)}>Load</button>
      </div>
    </div>
  );
}
