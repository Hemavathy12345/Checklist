'use client'
import '@/styles/Events.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
const Events = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [budget, setBudget] = useState('');


const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  const eventData = {
    name, type, date, time, location, targetAudience, budget
  };

  try {
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });

    if (res.ok) {
      alert("Event saved to MongoDB!");
      router.push('/events/list');
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
  } catch (err) {
    alert("Request failed: " + err.message);
  }
};


  return (
    <div className="event">
      <div className="eheader">
        <h2>
          <span className="red">Event</span>{' '}
          <span className="blue">Details</span>
        </h2>
        <button className="btn" onClick={handleSubmit}>Save</button>
      </div>

      <form className="eform">
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            placeholder="Enter event name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Event Type</label>
          <input
            list="event-types"
            placeholder="Select event type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="input-field"
          />
          <datalist id="event-types">
            <option value="Temple Festival" />
            <option value="Community Meeting" />
            <option value="School Function" />
            <option value="Cultural Program" />
            <option value="Local Sports Event" />
            <option value="Other" />
          </datalist>
        </div>

        <div className="form-group">
          <label>Event Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            placeholder="Enter event location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Target Audience</label>
          <input
            type="text"
            placeholder="e.g., Students, Professionals"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group full-width">
          <label>Budget</label>
          <input
            type="text"
            placeholder="Enter estimated budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="input-field"
          />
        </div>
      </form>
    </div>
  );
};

export default Events;
