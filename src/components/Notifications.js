// NotificationList.js
import React, { useState, useEffect } from 'react';
import './blinking.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch notifications from the API
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://warp-dusty-jingle.glitch.me/api/notifications');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []); // Runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      
      <marquee><ul >
        {notifications.map((notification, index) => (
          <li key={index}><span className='blinking-icon'>New</span>{notification.notify}<span className='blinking-icon'>New</span></li>
        ))}
      </ul></marquee>
    </div>
  );
};

export default Notifications;
