import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../../styles/Admin/Admin.css";
import ImageCarousel from "../../Components/Event/ImageCarousel";
import ImageCarouselEventTab from "../../Components/Event/imageCarouselEventTab";
import ApproveBtn from "./ApproveBtn";
import RejectBtn from "./RejectBtn";

const FetchPendingEvents = () => {
  const [events, setEvents] = useState([]);
  const [eventSelected, setEventSelected] = useState(null);

  // Fetch events from backend
  const getEvents = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Admin/getPendingEvents.php",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const response = await res.json();

      if (response.success) {
        setEvents(response.events);
        console.log(events);
      } else {
        toast.error(response.message || "Failed to fetch events");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong while fetching events");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="pending-events-container">
      <h2 className="pending-title">
        Pending <span>Events</span>
      </h2>

      <div className="all-pending-events">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.event_id}
              className="pending-event"
              onClick={() => setEventSelected(event)}
            >
              <div className="event-header">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-category">{event.category}</p>
              </div>

              <p className="event-desc">{event.description}</p>

              <div className="organizer-details">
                <img
                  src={
                    event.pfp
                      ? `http://localhost/React/eevent/src/uploads/pfp/${event.pfp}`
                      : "http://localhost/React/eevent/src/uploads/pfp/default-avatar.avif"
                  }
                  alt="organizer"
                  className="organizer-pfp"
                />
                <div>
                  <h4>{event.displayName || event.username}</h4>
                  <p className="organizer-email">{event.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-events">No pending events found</p>
        )}
      </div>

      {eventSelected && (
        <div
          className="event-pend-overlay-container"
          onClick={() => setEventSelected(null)}
        >
          <div
            className="event-pend-overlay"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pend-image-carousel">
              <ImageCarouselEventTab image_urls={eventSelected.image_urls} />
            </div>

            <h3>
              {eventSelected.start_datetime
                ? new Date(eventSelected.start_datetime).toLocaleString()
                : "No start time"}
            </h3>

            <div className="overlay-actions">
              <ApproveBtn event={eventSelected} />
              <RejectBtn event={eventSelected} />{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchPendingEvents;
