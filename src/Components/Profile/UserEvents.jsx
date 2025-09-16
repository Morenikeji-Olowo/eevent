import React, { useState } from "react";
import '../../styles/eventTab/eventTab.css';
import ImageCarousel from "../Event/ImageCarousel";
import ImageCarouselEventTab from "../Event/imageCarouselEventTab";

const UserEvents = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState(null); 

  if (!events || events.length === 0) {
    return <p className="no-posts">No events yet</p>;
  }

  return (
    <div className="event-tab-container">
      {events.map((event) => (
        <div
          className="event-tab-card"
          key={event.id}
          onClick={() => setSelectedEvent(event)} // set clicked post
        >
          {/* Show image only if post has one */}
          {event.image_urls && (
            <ImageCarouselEventTab title={event.title} image_urls={event.image_urls} />
          )}

         
        </div>
      ))}

      {/* Overlay - shows only when a post is selected */}
      {setSelectedEvent && (
        <>
        </>
      )}
    </div>
  );
};

export default UserEvents;
