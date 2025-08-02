"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import '@/styles/details.css';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(undefined);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        const found = data.events.find((e) => e._id === id);
        if (found) {
          setEvent(found);
          setTasks(found.checklist || []);
        } else {
          setEvent(null);
        }
      });
  }, [id]);

  const updateChecklistInDB = async (updatedTasks) => {
    await fetch(`/api/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ checklist: updatedTasks }),
    });
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const updated = [...tasks, { text: newTask, done: false }];
      setTasks(updated);
      setNewTask("");
      updateChecklistInDB(updated);
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
    updateChecklistInDB(updated);
  };

  return (
    <div className="event-details-container">
      <h2>Event Details</h2>
      {event === undefined ? (
        <p>Loading event details...</p>
      ) : event === null ? (
        <p>No event found</p>
      ) : (
        <div className="event-card">
          <h3>{event.name}</h3>
          <p><strong>Type:</strong> {event.type}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Audience:</strong> {event.targetAudience}</p>
          <p><strong>Budget:</strong> ₹{event.budget}</p>

          <div className="checklist">
            <div className="checklist-header">
              <h4>Checklist</h4>
              <p>{tasks.filter(t => t.done).length}/{tasks.length} completed</p>
            </div>

            <ul className="task-list">
              {tasks.map((task, i) => (
                <li key={i} className={`task ${task.done ? 'done' : ''}`}>
                  <input  type="checkbox" className="custom-checkbox" checked={task.done} onChange={() => toggleTask(i)}/>
                  {task.text}
                </li>
              ))}
            </ul>

            <div className="add-task">
              <input type="text" placeholder="Add new task..." value={newTask} onChange={(e) => setNewTask(e.target.value)}/>
              <button onClick={handleAddTask}>+</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;