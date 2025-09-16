import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Event.css";
import { toast } from "react-toastify"; // make sure you installed react-toastify
import "react-toastify/dist/ReactToastify.css";
const locations = [
  { name: "Venue", id: 1 },
  { name: "Online Event", id: 2 },
  { name: "To be announced", id: 3 },
];
const initialState = {
  eventTitle: "",
  eventDescription: "",
  eventDate: "",
  startTime: "",
  endTime: "",
  category: "", // or selectedCategory if needed
  searchedLocation: "",
  zoomId: "",
  price: "",
  freeEvent: false,
  capacity: "",
  status: "draft",
};



const EventForm = () => {
  const location = useLocation();

  const selectedCategory = location.state?.selectedCategory;

  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDescription: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    category: selectedCategory,
    searchedLocation: "",
    zoomId: "",
    price: "",
    freeEvent: false,
    capacity: "",
    status: "draft", // ✅ NEW status field
  });

  const [eventLocation, setEventLocation] = useState(1);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    data.append(key, value);
  });

  images.forEach((img) => {
    data.append("images[]", img);
  });

  console.log(data)
  try {
    const response = await fetch(
      "http://localhost/React/eevent/src/BackEnd/src/Event/addEvent.php",
      {
        method: "POST",
        body: data,
        credentials: "include",
      }
    );

    const phpResponse = await response.json();
    if (!response.ok) {
      toast.error("Error: " + phpResponse.message);
    } else {
      toast.success(phpResponse.message);
    setFormData(initialState);
      setImages([]);
      navigate('/dashBoard/event-category-select')
    }
  } catch (err) {
    console.error(err);
  }

};

  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleFreeEventToggle = (e) => {
    setFormData({
      ...formData,
      freeEvent: e.target.checked,
      price: e.target.checked ? "" : formData.price,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="event-form-container">
      <h1>Create an Event</h1>
      <p className="subtitle">
        Answer a few questions about your event and we'll use our tools to help
        you set it up!
      </p>

      {/* Event Title */}
      <section>
        <h2>What’s the name of your event?</h2>
        <p className="helper-text">
          Your title will help create your event's summary, description,
          category and tags — so be specific!
        </p>
        <input
          type="text"
          placeholder="Enter event title"
          className="input-field"
          name="eventTitle"
          value={formData.eventTitle}
          onChange={handleChange}
          required
        />
      </section>

      {/* Description */}
      <section>
        <h2>Describe your event?</h2>
        <p className="helper-text">
          Shed more light on your event to the world!
        </p>
        <textarea
          placeholder="Description"
          className="input-field"
          name="eventDescription"
          value={formData.eventDescription}
          onChange={handleChange}
          required
        />
      </section>

      {/* Date & Time */}
      <section>
        <h2>When does your event start and end?</h2>
        <p className="helper-text">
          Choose a date and time that works best for your audience.
        </p>
        <div className="date-time-group">
          <input
            type="date"
            className="input-field"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
          <div className="start-time">
            <p>Start time</p>
            <input
              type="time"
              className="input-field"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="start-time">
            <p>End time</p>
            <input
              type="time"
              className="input-field"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </section>

      {/* Location */}
      <section>
        <h2>Where is it located?</h2>
        <p className="helper-text">
          Choose a physical venue, online event, or mark it as to be announced.
        </p>
        <div className="location-options">
          {locations.map((loca) => (
            <button
              key={loca.id}
              className={`location-btn ${
                eventLocation === loca.id ? "active" : ""
              }`}
              onClick={() => setEventLocation(loca.id)}
            >
              {loca.name}
            </button>
          ))}
        </div>

        {eventLocation === 1 && (
          <input
            type="text"
            name="searchedLocation"
            placeholder="Type location..."
            className="input-field"
            value={formData.searchedLocation}
            onChange={handleChange}
            required
          />
        )}
        {eventLocation === 2 && (
          <input
            type="text"
            name="zoomId"
            placeholder="Zoom link or meeting ID"
            className="input-field"
            value={formData.zoomId}
            onChange={handleChange}
            required
          />
        )}
      </section>

      {/* Image Upload */}
      <section>
        <h2>Add Images</h2>
        <p className="helper-text">
          Add at least one image to make your event more attractive.
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="image-preview-container">
          {images.map((img, index) => (
            <img
              key={index}
              src={URL.createObjectURL(img)}
              alt={`preview-${index}`}
              className="image-preview"
            />
          ))}
        </div>
      </section>

      {/* Price */}
      <section>
        <h2>How much do you want to charge for tickets?</h2>
        <p className="helper-text">
          Our tool can only generate one General Admission ticket for now — you
          can edit it later.
        </p>
        <div className="price-section">
          <input
            type="text"
            name="price"
            placeholder="$"
            id="price"
            className="input-field"
            value={formData.price}
            onChange={handleChange}
            disabled={formData.freeEvent}
            required
          />
          <label>
            <input
              type="checkbox"
              name="freeEvent"
              checked={formData.freeEvent}
              onChange={handleFreeEventToggle}
            />{" "}
            Free Event
          </label>
        </div>
      </section>

      {/* Capacity */}
      <section>
        <h2>What’s the capacity?</h2>
        <p className="helper-text">
          Let people know how many can attend. You can change this later.
        </p>
        <input
          type="number"
          className="input-field"
          placeholder="Enter number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
      </section>

      {/* Status (NEW) */}
      <section>
        <h2>Event Status</h2>
        <p className="helper-text">
          Choose whether to save as a draft or publish immediately.
        </p>
        <select
          name="status"
          className="input-field"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </section>

      <button  className="submit-btn" onClick={handleSubmit}>
        Create Event
      </button>
    </div>
  );
};

export default EventForm;
