import React from 'react';
import './HomePage.css';
import { FaLightbulb, FaCogs } from 'react-icons/fa';
import ImageSlider from './ImageSlider.js'; // Import the ImageSlider component

const HomePage = () => {
  return (
    <div className='homepage'>
      {/* Image Slider */}
      <section className="hero">
        <ImageSlider /> {/* Render the ImageSlider component here */}
      </section>

      {/* Vision and Mission Section */}
      <section className="vision-mission">
        <div className="vision">
          <FaLightbulb size={40} color="#007bff" />
          <h3>Vision</h3>
          <p>
            To produce World-class Engineers for converting global challenges into opportunities through, "Value Embedded Quality Technical Education", and to develop this College as an Academy of Higher Learning in the field of Engineering & Technology.
          </p>
        </div>

        <div className="mission">
          <FaCogs size={40} color="#007bff" />
          <h3>Mission</h3>
          <p>
            To impart Technical education and training to the poor and most backward students of Rayalaseema to develop their holistic Personality and to prepare them for work and life, equipping them to be life-long learners and to contribute to the technological, economic, and social development of India.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses">
        <h2>Our Programs</h2>

        <div className="course-list">
          <div className="course-item">
           
            <h3>Diploma Courses</h3>
            <ul>
              <li>Diploma in Computer Engg.</li>
              <li>Diploma in Electronics and Communications Engg.</li>
              <li>Diploma in Electrical and Electronics Engg.</li>
              <li>Diploma in Civil Engg.</li>
              <li>Diploma in Mechanical Engg.</li>
              <li>Diploma in Mining Engg.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
