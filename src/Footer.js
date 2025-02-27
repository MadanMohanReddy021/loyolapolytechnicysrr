import React from 'react';
import './Footer.css'; // Import the Footer CSS file
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Loyola Polytechnic is committed to providing high-quality technical education. We strive to empower our students with the knowledge and skills needed to excel in their chosen fields.
          </p>
          <div className="contact-details">
            <p><FaMapMarkerAlt /> Pulivendla, YSR Kadapa District, AP, India</p>
            <p><FaPhone /> +91-9876543210</p>
            <p><FaEnvelope /> loyolapoly.pulivendla@gmail.com</p>
          </div>
        </div>

        

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://m.facebook.com/loyolapolytechnic/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            
            <a href="https://www.instagram.com/loyola_polytechnic_plvd?igsh=MXByb2V0bXB4bHg1MQ==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
           
          </div>
        </div>
      </div>
      <div className='develop'> <span>Designed, developed, and hosted by Madan, Rakesh, Nanda, and Hemesh under the mentorship of Mr. L. Ashok Kumar Reddy from Loyola Polytechnic(YSRR)</span></div>
    </footer>
  );
}

export default Footer;