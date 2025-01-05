import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Activenotifications = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('https://backend-upqj.onrender.com/api/notifications');
        setNotifications(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching notifications:',error);
      }
    };

    fetchNotifications();
  }, []);

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`https://backend-upqj.onrender.com/api/notifications/${id}`);
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div>
      <h1>Notifications </h1>
      <ul>
        {notifications.map(notification => (
          <li key={notification.id} style={{ marginBottom: '10px' }}>
            <span>{notification.notify}</span>
            <button className="btn btn-danger"
              onClick={() => deleteNotification(notification.id)} 
              style={{ marginLeft: '10px', color: 'white' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activenotifications;
