'use client';
import { useEffect, useState } from 'react';
import '@/styles/list.css';
const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data.events));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Saved Events</h2>
     
<ul className='list'>
  {Array.isArray(events) && events.map((event, i) => (
    <button className='listitem' key={event._id} onClick={() => window.location.href = `/events/${event._id}` }>
      <li >{event.name}</li>
    </button>
  ))}
</ul>
    </div>
  );
};

export default EventList;
