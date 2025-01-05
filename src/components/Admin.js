import React, { useState } from 'react';
import Addnotice from './Addnotice.js';
import Activenotifications from './Activenotifications.js';
import Uploadimages from './Uploadimages.js';
import './Admin.css';
import Login from './Login.js';
import FetchMarks from './FetchMarks.js';
const token = localStorage.getItem('token');

console.log(token);
const Admin = () => {
  // State to manage the selected component
  const [selectedComponent, setSelectedComponent] = useState('login');

  // Function to handle the change of the selected component
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="Admin">
      <h1>Admin Dashboard</h1>

      
      <div style={{ alignContent: 'center' }} ><ul className="nav nav-tabs">
      {(token&&  <li className="nav-item active"> <button className="btn btn-outline-info btn-lg"    onClick={() => handleComponentChange('notifications')}>Manage Notifications</button></li>)}
      {(token&& <li className="nav-item">  <button className="btn btn-outline-info btn-lg"    onClick={() => handleComponentChange('gallery')}>Add Photos to  Gallery</button></li>)}
      {(token&& <li className="nav-item">  <button className="btn btn-outline-info btn-lg"    onClick={() => handleComponentChange('fetchmarks')}>fetch the marks</button></li>)}

        </ul></div>

      {/* Conditionally render selected component */}
      {(token && selectedComponent === 'notifications' )&& <div > <Activenotifications /><Addnotice />
        </div>}
      { (token &&selectedComponent === 'gallery' )&& <Uploadimages />}
      { (token &&selectedComponent === 'fetchmarks' )&& <FetchMarks />}
      {(!token)&& <Login />}
    </div>
  );
};

export default Admin;
