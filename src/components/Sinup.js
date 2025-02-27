import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios'; // Import Axios for making API requests

const SignupForm = () => {
  const [formData, setFormData] = useState({
    hallTicket: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add a loading state
  const [apiError, setApiError] = useState(null); // State to hold API errors

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.hallTicket.trim()) {
      newErrors.hallTicket = '10th Hall Ticket Number is required';
      isValid = false;
    }
    // You can add more complex hall ticket validation if needed

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => { // Make handleSubmit async
    event.preventDefault();
    setApiError(null); //clear any previous error
    if (validateForm()) {
      setIsLoading(true); // Start loading

      try {
        const response = await axios.post('https://backend-upqj.onrender.com/api/signup', formData); // Replace with your actual API endpoint
        console.log('Signup successful:', response.data);
        setFormSubmitted(true);
        // Optionally reset form fields here
        setFormData({
          hallTicket: '',
          name: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Signup failed:', error);
        setApiError('Signup failed. Please try again.'); // Set API error message
        if (error.response && error.response.data) {
          console.error('Server error data:', error.response.data);
          setApiError(error.response.data.message || 'Signup failed. Please try again.');
        } else {
          console.error('Error details:', error);
          setApiError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setIsLoading(false); // Stop loading
      }
    } else {
      console.log('Signup Form has errors');
    }
  };

  if (formSubmitted) {
    return (
      <div className="container mt-5">
        <div className="alert alert-success" role="alert">
          Signup successful!
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4>Signup</h4>
            </div>
            <div className="card-body">
              {apiError && <div className="alert alert-danger">{apiError}</div>} {/* Display API error */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="hallTicket" className="form-label">
                    10th Hall Ticket Number:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.hallTicket ? 'is-invalid' : ''}`}
                    id="hallTicket"
                    name="hallTicket"
                    value={formData.hallTicket}
                    onChange={handleChange}
                  />
                  {errors.hallTicket && (
                    <div className="invalid-feedback">{errors.hallTicket}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Signing up...' : 'Signup'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
