import React, { useState } from 'react';
import LoginForm from './LoginForm.js';
import PaymentForm from './PaymentForm.js';
import SinupForm from './Sinup.js';
import ApplicationForm from './ApplicationForm.js';
import './Admin.css';
import Result from './Result.js';

const loyolatoken = localStorage.getItem('loyolaToken');


const Admission = () => {
  // State to manage the selected component
  const [selectedComponent, setSelectedComponent] = useState('Login');

  // Function to handle the change of the selected component
  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="Admin">
      <h1>Admissions</h1>

      
      <div style={{ alignContent: 'center' }} ><ul className="nav nav-tabs">
      {((!loyolatoken)&&  <li className="nav-item active"> <button className="btn btn-outline-info btn-lg"    onClick={() => handleComponentChange('Login')}>Login</button></li>)}
      {((!loyolatoken)&& <li className="nav-item">  <button className="btn btn-outline-info btn-lg"    onClick={() => handleComponentChange('Sinup')}>Sinup</button></li>)}
      {(loyolatoken&&  <li className="nav-item active"> <button className="btn btn-outline-info btn-lg"    onClick={() => handleComponentChange('Payment')}>Pay Fee</button></li>)}
      {(loyolatoken&&  <li className="nav-item active"> <button className="btn btn-outline-info btn-lg"    onClick={() => handleComponentChange('Apply')}>Apply</button></li>)}
        
      {(loyolatoken&&  <li className="nav-item active"> <button className="btn btn-outline-info btn-lg"    onClick={() => handleComponentChange('Result')}>Result</button></li>)}</ul></div>

        { ((!loyolatoken) &&selectedComponent === 'Login' )&& <LoginForm />}
        { (loyolatoken &&selectedComponent === 'Apply' )&& <ApplicationForm />}
        { (loyolatoken &&selectedComponent === 'Payment' )&& <PaymentForm />}
        { ((!loyolatoken) &&selectedComponent === 'Sinup' )&& <SinupForm />}

        { (loyolatoken &&selectedComponent === 'Result' )&& <Result />}
    </div>
  );
};

export default Admission;
