import React, { useState } from "react";
import './PlanEvent.css'

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    location: "",
    description: "",
    guests: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Planned:", formData);
    alert("🎉 Event has been planned successfully!");
  };

  return (
    <div className="form-container">
      <h2>Plan Your Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        
        <label>Event Name</label>
        <input
          type="text"
          name="eventName"
          placeholder="Birthday Party, Wedding, Conference..."
          value={formData.eventName}
          onChange={handleChange}
          required
        />

        <div className="row">
          <div className="column">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Location</label>
        <input
          type="text"
          name="location"
          placeholder="Event Hall, Park, Online..."
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Describe your event..."
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />

        <label>Number of Guests</label>
        <input
          type="number"
          name="guests"
          placeholder="e.g. 50"
          value={formData.guests}
          onChange={handleChange}
        />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;
