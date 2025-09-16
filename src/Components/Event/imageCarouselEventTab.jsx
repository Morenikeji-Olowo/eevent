import React, { useState } from "react";
import "../../styles/eventTab/ImageCarouselEventTab.css";

const ImageCarouselEventTab = ({ image_urls, title }) => {
  const images = JSON.parse(image_urls);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="event-tab-carousel-container">
      {images.length > 1 && (
        <button className="event-tab-carousel-btn left" onClick={prevSlide}>
          &#10094;
        </button>
      )}

      {/* Image Wrapper with Overlay */}
      <div className="event-tab-carousel-image-wrapper">
        <img
          src={`http://localhost/React/eevent/src/${images[currentIndex]}`}
          alt={`Slide ${currentIndex}`}
          className="event-tab-carousel-image"
        />
        <div className="event-tab-carousel-overlay">
          <h2 className="event-tab-carousel-title">{title}</h2>
        </div>
      </div>
      {images.length > 1 && (
        <button className="event-tab-carousel-btn right" onClick={nextSlide}>
          &#10095;
        </button>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="event-tab-carousel-dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(i)}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarouselEventTab;
