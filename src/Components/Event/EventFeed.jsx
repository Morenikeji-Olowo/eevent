import React, { useEffect, useState } from "react";
import "../../styles/Event.css";
import { Link } from "react-router-dom";

const EventFeed = () => {
  const [groupedEvents, setGroupedEvents] = useState({});

  const groupEventsByCategory = (events) => {
    const grouped = {};
    events.forEach((event) => {
      const category = event.category || "Uncategorized";
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(event);
    });
    return grouped;
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Event/fetchEvent.php"
      );
      const data = await res.json();
      if (data.success) {
        setGroupedEvents(groupEventsByCategory(data.events));
      }
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {Object.entries(groupedEvents).map(([category, events]) => (
        <div key={category} className="event-category-section">
          <h2 className="category-title">{category}</h2>
          <div className="events-grid">
            {events.map((event) => (
              <Link
                to={`/dashBoard/event-description/${event.event_id}`}
                key={event.event_id}
                className="event-card"
              >
                {/* Event Image */}
                <div
                  className="event-image"
                  style={{
                    backgroundImage: `url(${
                      event.image_urls
                        ? `http://localhost/React/eevent/src/${JSON.parse(
                            event.image_urls
                          )[0]}`
                        : "http://localhost/React/eevent/src/assets/images/ce0dc51946ba30caccbc4fff9d9e49ff.jpg"
                    })`,
                  }}
                ></div>

                {/* Event Info */}
                <div className="event-info">
                  <h2 className="event-name">{event.title}</h2>
                  <p className="event-date">
                    {new Date(event.start_datetime).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                  <p> Organizer: @{event.username}</p>
                  <p className="event-location">
                    {event.location_type === "venue"
                      ? event.location_address
                      : event.location_type === "online"
                      ? "Online Event"
                      : "Location TBA"}
                  </p>
                  <p className="event-price">
                    {event.is_free === "1" ? "Free" : `₦${event.ticket_price}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventFeed;
