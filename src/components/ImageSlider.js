import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Import your CSS file for styling
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Array of image URLs (replace with your actual image URLs)
  const images = [
    "images/auditorium.jpg",
    "images/BOYSHOSTEL.jpg",
    "images/cf1.jpg",
    // Add more image URLs here...
    "images/chemistry2.jpg",
    "images/physics1.jpg",
    "images/seminar hall.jpg",
    "images/gym.jpg",
    "images/library2.jpg"
  ];

  // Number of images to show at once
  const imagesToShow = isMobile ? 1 : 3;

  // Calculate the visible image indices
  const getVisibleImageIndices = () => {
    if (isMobile) {
      return [currentImageIndex];
    } else {
      const indices = [];
      for (let i = 0; i < imagesToShow; i++) {
        indices.push((currentImageIndex + i) % images.length);
      }
      return indices;
    }
  };

  const visibleImageIndices = getVisibleImageIndices();

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    // Initial check
    handleResize();

    // Event listener for resize
    window.addEventListener('resize', handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="image-slider">
      <button className="slider-arrow slider-arrow-left" onClick={goToPrevious}>
        <FaChevronLeft />
      </button>

      <div className="slider-container">
        {visibleImageIndices.map((index) => (
          <img
            key={index}
            src={images[index]}
            alt={`Slide ${index + 1}`}
            className="slider-image"
          />
        ))}
      </div>

      <button className="slider-arrow slider-arrow-right" onClick={goToNext}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;
