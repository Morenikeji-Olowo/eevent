import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/EventDescription.css";
import ImageCarousel from "./ImageCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHeart,
  faMapPin,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import EventComments from "./EventComments";

const EventDescription = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPostById = async () => {
    try {
      const response = await fetch(
        "http://localhost/React/eevent/src/BackEnd/src/Event/fetchEventDescription.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId }),
        }
      );
      const phpResponse = await response.json();

      if (phpResponse.success) {
        console.log("Fetched Event:", phpResponse.event);
        setEvent(phpResponse.event);
      } else {
        console.warn("Event not found");
      }
    } catch (err) {
      console.error("Error fetching event:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, [eventId]);

  if (loading) return <p>Loading event...</p>;
  if (!event) return <p>No event found</p>;

  const startDate = new Date(event.start_datetime);
  const endDate = new Date(event.end_datetime);

  const formattedDate = startDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const startTime = startDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const endTime = endDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const timeZone = "WAT"; // ✅ Define timezone

  return (
    <div className="event-container">
      {/* Image Carousel */}
      <div className="image-slider">
        {event.image_urls ? (
          <ImageCarousel image_urls={event.image_urls} />
        ) : (
          <p>No images</p>
        )}
      </div>
      <div className="container-content">
        {/* First Section */}
        <div className="first-step">
          <div className="fs-left">
            {startDate.toLocaleString("en-US", {
              weekday: "short",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>
          <div className="fs-right">
            <FontAwesomeIcon icon={faHeart} fontSize={"2rem"} color="black" />
            <FontAwesomeIcon icon={faUpload} fontSize={"2rem"} color="black" />
          </div>
        </div>

        {/* Title and Ticket Price */}
        <div className="second-step">
          <div className="ss-left">{event.title}</div>
          <div className="ss-right">
            <div className="inner-left-text">
              <p>{event.is_free === 1 ? "Free" : `₦${event.ticket_price}`}</p>
              <p>
                Start:{" "}
                {startDate.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}{" "}
                End:{" "}
                {endDate.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="inner-right">
              <button>Get Ticket</button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="third-step">{event.description}</div>

        {/* Date and Time */}
        <div className="forth-step">
          <h1>Date and Time</h1>
          <div className="inner-contents">
            <div>
              <FontAwesomeIcon
                icon={faCalendar}
                fontSize={"2rem"}
                color="black"
              />
            </div>
            <p>
              {formattedDate} · {startTime.toLowerCase()} -{" "}
              {endTime.toLowerCase()} {timeZone}
            </p>
          </div>
        </div>

        <div className="fifth-step">
          <h1>{event.location_address !== "" ? "Location" : "Zoom Id"}</h1>
          <div className="inner-contents">
            <FontAwesomeIcon icon={faMapPin} color="black" fontSize={"2rem"} />
            <h3>
              {event.location_address !== ""
                ? event.location_address
                : event.zoom_link}
            </h3>
          </div>
        </div>

        <div>
          <EventComments eventId={eventId} />
        </div>

        <div className="fifth-step">
          <h1>Organized By</h1>
          <div className="organizer-card">
            <img
              src={
                event.pfp
                  ? `http://localhost/React/eevent/src/uploads/pfp/${event.pfp}`
                  : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
              }
              alt="organizer"
            />
            <h2>{event.username}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDescription;
