import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [hallTicket, setHallTicket] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (hallTicket === '' || password === '') {
      setError('Both fields are required');
      return;
    }

    setLoading(true); // Set loading to true when starting the request

    try {
      // Send login request to the backend
      const response = await axios.post('https://backend-upqj.onrender.com/api/candidate-login', {
        username: hallTicket, // Send hallTicket as username
        password,
      });

      alert('Login successful: ' + response.data.message);
      localStorage.setItem('hallTicket', hallTicket);
      localStorage.setItem('loyolaToken', response.data.loyolaToken); // Changed "token" to "loyolaToken"
      // Optionally, set a timeout to remove the token after a certain period
      setTimeout(() => {
        localStorage.removeItem('loyolaToken');
        localStorage.removeItem('hallTicket'); // Changed "token" to "loyolaToken"
      }, 3600000); // Example: 1 hour timeout
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed. Please try again.'); // Set API error message
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false); // Set loading back to false after the request is complete
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="hallTicket">Hall Ticket:</label>
                  <input
                    type="text"
                    id="hallTicket"
                    name="hallTicket"
                    value={hallTicket}
                    onChange={(e) => setHallTicket(e.target.value)}
                    className="form-control"
                    placeholder="Enter Hall Ticket"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>

                {error && <p className="text-danger">{error}</p>}

                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
