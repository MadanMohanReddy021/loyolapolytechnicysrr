import React from 'react';
import './ContactPage.css';  // Assuming the CSS is in the same folder

const ContactPage = () => {
  return (
    <div className="contact-container">
      <h1>Contact Information</h1>
      <div className="contact-details">
        <div className="contact-item">
          <h2>Address</h2>
          <p>
            Loyola Polytechnic College (YSRR),<br />
            Pulivendla - 516390, YSR District,<br />
            Andhra Pradesh, India.
          </p>
        </div>

        <div className="contact-item">
          <h2>Contact Number</h2>
          <p>
            <a href="tel:+919912342029">+91 9912342029</a><br />
            <a href="tel:+9108568286309">08568 - 286309</a>
          </p>
        </div>

        <div className="contact-item">
          <h2>Email Address</h2>
          <p>
            <a href="mailto:loyolapoly.pulivendla@gmail.com">loyolapoly.pulivendla@gmail.com</a>
          </p>
        </div>

        <div className="contact-item">
          <h2>Website</h2>
          <p>
            <a href="http://www.loyolapolytechnic.co.in" target="_blank" rel="noopener noreferrer">
              www.loyolapolytechnic.co.in
            </a>
          </p>
        </div>
        <div className="contact-item">
          <h2>Follow us on Instragram for lateset updates</h2>
          <p>
            <a href="https://www.instagram.com/loyola_polytechnic_plvd?igsh=MXByb2V0bXB4bHg1MQ==" target="_blank" rel="noopener noreferrer">
              @loyola__polytechnic_plvd
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
