import React, { useState } from "react";
import "../../styles/EventDescription.css"; // <-- Add this

const ImageCarousel = ({ image_urls }) => {
  const images = JSON.parse(image_urls); // Convert JSON string to array
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
    <div className="carousel-container">
      <button className="carousel-btn left" onClick={prevSlide}>
        &#10094;
      </button>

      <img
        src={`http://localhost/React/eevent/src/${images[currentIndex]}`}
        alt={`Slide ${currentIndex}`}
        className="carousel-image"
      />

      <button className="carousel-btn right" onClick={nextSlide}>
        &#10095;
      </button>

      {/* Dots */}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
